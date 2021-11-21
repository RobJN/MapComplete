import {SubtleButton} from "../Base/SubtleButton";
import Svg from "../../Svg";
import Translations from "../i18n/Translations";
import State from "../../State";
import {Utils} from "../../Utils";
import Combine from "../Base/Combine";
import CheckBoxes from "../Input/Checkboxes";
import {GeoOperations} from "../../Logic/GeoOperations";
import Toggle from "../Input/Toggle";
import Title from "../Base/Title";
import FeaturePipeline from "../../Logic/FeatureSource/FeaturePipeline";
import {UIEventSource} from "../../Logic/UIEventSource";
import SimpleMetaTagger from "../../Logic/SimpleMetaTagger";
import LayoutConfig from "../../Models/ThemeConfig/LayoutConfig";
import {BBox} from "../../Logic/BBox";
import geojson2svg from "geojson2svg"

export class DownloadPanel extends Toggle {

    constructor() {
        const state: {
            featurePipeline: FeaturePipeline,
            layoutToUse: LayoutConfig,
            currentBounds: UIEventSource<BBox>
        } = State.state


        const t = Translations.t.general.download
        const name = State.state.layoutToUse.id;

        const includeMetaToggle = new CheckBoxes([t.includeMetaData.Clone()])
        const metaisIncluded = includeMetaToggle.GetValue().map(selected => selected.length > 0)


        const buttonGeoJson = new SubtleButton(Svg.floppy_ui(),
            new Combine([t.downloadGeojson.SetClass("font-bold"),
                t.downloadGeoJsonHelper]).SetClass("flex flex-col"))
            .onClick(() => {
                const geojson = DownloadPanel.getCleanGeoJson(state, metaisIncluded.data)
                Utils.offerContentsAsDownloadableFile(JSON.stringify(geojson, null, "  "),
                    `MapComplete_${name}_export_${new Date().toISOString().substr(0, 19)}.geojson`, {
                        mimetype: "application/vnd.geo+json"
                    });
            })


        const buttonSvg = new SubtleButton(Svg.floppy_ui(), new Combine([
            t.downloadSvg.SetClass("font-bold"),
            t.downloadSvgHelper
        ]).SetClass("flex flex-col"))
            .onClick(() => {
                const geojson = {...DownloadPanel.getCleanGeoJson(state, metaisIncluded.data)}

                const bbox = state.currentBounds.data
                const converter = geojson2svg()
                const paths = []
                const width = 2500
                const height = 2500
                for (const feature of geojson.features) {
                    feature.geometry.coordinates = DownloadPanel.rescale(feature.geometry.coordinates, bbox)
                    const pathDescription = converter.convert(feature, {
                        viewportSize:{
                            width, height
                        },
                        output: 'path',
                    })
                    const layer = state.layoutToUse.getMatchingLayer(feature.properties)
                    for (const mr of layer.lineRendering) {
                        const rendering = mr.GenerateLeafletStyle(feature.presets)
                        const path = `<path d="${pathDescription}" style="fill:${rendering.fill ?? "none"};fill-opacity:${1};stroke:${rendering.color};stroke-width:${rendering.weight};stroke-opacity:1;stroke-linecap:${rendering.lineCap ?? "butt"}" id="${feature.properties.id}" />`
                        paths.push(path)
                    }
                }


                const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n\t${paths.join("\n\t")}</svg>`
                console.log("SVG is", svg)
                Utils.offerContentsAsDownloadableFile(svg, `MapComplete_${name}_export_${new Date().toISOString().substr(0, 19)}.svg`,
                    {
                        mimetype: "image/svg+xml"
                    })
            })


        const buttonCSV = new SubtleButton(Svg.floppy_ui(), new Combine(
            [t.downloadCSV.SetClass("font-bold"),
                t.downloadCSVHelper]).SetClass("flex flex-col"))
            .onClick(() => {
                const geojson = DownloadPanel.getCleanGeoJson(state, metaisIncluded.data)
                const csv = GeoOperations.toCSV(geojson.features)

                Utils.offerContentsAsDownloadableFile(csv,
                    `MapComplete_${name}_export_${new Date().toISOString().substr(0, 19)}.csv`, {
                        mimetype: "text/csv"
                    });
            })

        const downloadButtons = new Combine(
            [new Title(t.title),
                buttonGeoJson,
                buttonCSV,
                buttonSvg,
                includeMetaToggle,
                t.licenseInfo.SetClass("link-underline")])
            .SetClass("w-full flex flex-col border-4 border-gray-300 rounded-3xl p-4")

        super(
            downloadButtons,
            t.noDataLoaded,
            state.featurePipeline.somethingLoaded)
    }

    private static rescale(coordinates: [number, number] | [number, number] [] | [number, number] [][], bbox: BBox): ([number, number] | [number, number] [] | [number, number] [][]) {
        if (typeof coordinates[0] === "number") {

            const lon = coordinates[0]
            const lat = <number>coordinates[1]
            return [
                (100000000 * (lon - bbox.minLon)) / (bbox.maxLon - bbox.minLon),
                (100000000 * (lat - bbox.minLat)) / (bbox.maxLat - bbox.minLat)
            ]
        } else {
            // @ts-ignore
            return coordinates.map(c => DownloadPanel.rescale(c, bbox))
        }


    }

    private static getCleanGeoJson(state: {
        featurePipeline: FeaturePipeline,
        currentBounds: UIEventSource<BBox>
    }, includeMetaData: boolean) {

        const resultFeatures = []
        const featureList = state.featurePipeline.GetAllFeaturesWithin(state.currentBounds.data);
        for (const tile of featureList) {
            for (const feature of tile) {
                const cleaned = {
                    type: feature.type,
                    geometry: {...feature.geometry},
                    properties: {...feature.properties}
                }

                if (!includeMetaData) {
                    for (const key in cleaned.properties) {
                        if (key === "_lon" || key === "_lat") {
                            continue;
                        }
                        if (key.startsWith("_")) {
                            delete feature.properties[key]
                        }
                    }
                }

                const datedKeys = [].concat(SimpleMetaTagger.metatags.filter(tagging => tagging.includesDates).map(tagging => tagging.keys))
                for (const key of datedKeys) {
                    delete feature.properties[key]
                }

                resultFeatures.push(feature)
            }
        }

        return {
            type: "FeatureCollection",
            features: resultFeatures
        }

    }
}