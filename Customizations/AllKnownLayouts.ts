import {All} from "./Layouts/All";
import {StreetWidth} from "./Layouts/StreetWidth";
import {LayerDefinition} from "./LayerDefinition";
import {ClimbingTrees} from "./Layouts/ClimbingTrees";
import {Smoothness} from "./Layouts/Smoothness";
import {Natuurpunt} from "./Layouts/Natuurpunt";
import {Groen} from "./Layouts/Groen";
import Cyclofix from "./Layouts/Cyclofix";
import {Layout} from "./Layout";
import {CustomLayout} from "../Logic/CustomLayers";
import {GRB} from "./Layouts/GRB";
import {Artworks} from "./Layouts/Artworks";
import {WalkByBrussels} from "./Layouts/WalkByBrussels";
import {MetaMap} from "./Layouts/MetaMap";
import {Bookcases} from "./Layouts/Bookcases";

export class AllKnownLayouts {

    public static allLayers: Map<string, LayerDefinition> = undefined;
    
    public static layoutsList: Layout[] = [
        new CustomLayout(),
        new Groen(),
        new GRB(),
        new Cyclofix(),
        new Bookcases(),
        new WalkByBrussels(),
        new MetaMap(),
        new StreetWidth(),
        new Natuurpunt(),
        new ClimbingTrees(),
        new Artworks(),
        new Smoothness(),
        /*new Toilets(),
        */
    ];

    public static allSets: Map<string, Layout> = AllKnownLayouts.AllLayouts();

    private static AllLayouts(): Map<string, Layout> {

        const all = new All();
        this.allLayers = new Map<string, LayerDefinition>();
        for (const layout of this.layoutsList) {
            for (const layer of layout.layers) {
                const key = layer.id;
                if (this.allLayers[layer.id] !== undefined) {
                    continue;
                }
                this.allLayers[layer.id] = layer;
                all.layers.push(layer);
            }
        }

        const allSets: Map<string, Layout> = new Map();
        for (const layout of this.layoutsList) {
            allSets[layout.name] = layout;
        }
        allSets[all.name] = all;
        return allSets;
    }

}
