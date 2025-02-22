bike_cleaning
===============



<img src='https://mapcomplete.osm.be/./assets/layers/bike_cleaning/bike_cleaning.svg' height="100px"> 

A layer showing facilities where one can clean their bike

## Table of contents

1. [bike_cleaning](#bike_cleaning)
    * [Themes using this layer](#themes-using-this-layer)

- [Basic tags for this layer](#basic-tags-for-this-layer)
- [Supported attributes](#supported-attributes)
    + [images](#images)
    + [bike_cleaning-service:bicycle:cleaning:charge](#bike_cleaning-servicebicycle:cleaning:charge)
    + [bike_cleaning-charge](#bike_cleaning-charge)

#### Themes using this layer

- [cyclofix](https://mapcomplete.osm.be/cyclofix)
- [personal](https://mapcomplete.osm.be/personal)

[Go to the source code](../assets/layers/bike_cleaning/bike_cleaning.json)



Basic tags for this layer
---------------------------



Elements must have the all of following tags to be shown on this layer:

- <a href='https://wiki.openstreetmap.org/wiki/Key:service:bicycle:cleaning' target='_blank'>service:bicycle:
  cleaning</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:service:bicycle:cleaning%3Dyes' target='_blank'>yes</a>
  |<a href='https://wiki.openstreetmap.org/wiki/Key:service:bicycle:cleaning' target='_blank'>service:bicycle:
  cleaning</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:service:bicycle:cleaning%3Ddiy' target='_blank'>diy</a>
  |<a href='https://wiki.openstreetmap.org/wiki/Key:amenity' target='_blank'>amenity</a>
  =<a href='https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dbicycle_wash' target='_blank'>bicycle_wash</a>
  |<a href='https://wiki.openstreetmap.org/wiki/Key:amenity' target='_blank'>amenity</a>
  =<a href='https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dbike_wash' target='_blank'>bike_wash</a>

Supported attributes
----------------------



**Warning** This quick overview is incomplete

attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/service:bicycle:cleaning:charge#values) [service:bicycle:cleaning:charge](https://wiki.openstreetmap.org/wiki/Key:service:bicycle:cleaning:charge) | [string](../SpecialInputElements.md#string) |
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/charge#values) [charge](https://wiki.openstreetmap.org/wiki/Key:charge) | [string](../SpecialInputElements.md#string) |

### images

_This tagrendering has no question and is thus read-only_

### bike_cleaning-service:bicycle:cleaning:charge

The question is **How much does it cost to use the cleaning service?**

This rendering asks information about the
property  [service:bicycle:cleaning:charge](https://wiki.openstreetmap.org/wiki/Key:service:bicycle:cleaning:charge)
This is rendered with `Using the cleaning service costs {service:bicycle:cleaning:charge}`

- **The cleaning service is free to use** corresponds
  with <a href='https://wiki.openstreetmap.org/wiki/Key:service:bicycle:cleaning:fee' target='_blank'>service:bicycle:
  cleaning:fee</a>
  =<a href='https://wiki.openstreetmap.org/wiki/Tag:service:bicycle:cleaning:fee%3Dno&service:bicycle:cleaning:charge=' target='_blank'>
  no&service:bicycle:cleaning:charge=</a>
- **Free to use** corresponds
  with <a href='https://wiki.openstreetmap.org/wiki/Key:service:bicycle:cleaning:fee' target='_blank'>service:bicycle:
  cleaning:fee</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:service:bicycle:cleaning:fee%3Dno' target='_blank'>
  no</a>_This option cannot be chosen as answer_
- **The cleaning service has a fee, but the amount is not known** corresponds
  with <a href='https://wiki.openstreetmap.org/wiki/Key:service:bicycle:cleaning:fee' target='_blank'>service:bicycle:
  cleaning:fee</a>
  =<a href='https://wiki.openstreetmap.org/wiki/Tag:service:bicycle:cleaning:fee%3Dyes&service:bicycle:cleaning:charge=' target='_blank'>
  yes&service:bicycle:cleaning:charge=</a>_This option cannot be chosen as answer_

### bike_cleaning-charge

The question is **How much does it cost to use the cleaning service?**

This rendering asks information about the property  [charge](https://wiki.openstreetmap.org/wiki/Key:charge)
This is rendered with `Using the cleaning service costs {charge}`

- **Free to use cleaning service** corresponds
  with <a href='https://wiki.openstreetmap.org/wiki/Key:fee' target='_blank'>fee</a>
  =<a href='https://wiki.openstreetmap.org/wiki/Tag:fee%3Dno&charge=' target='_blank'>no&charge=</a>
- **Free to use** corresponds with <a href='https://wiki.openstreetmap.org/wiki/Key:fee' target='_blank'>fee</a>
  =<a href='https://wiki.openstreetmap.org/wiki/Tag:fee%3Dno' target='_blank'>no</a>_This option cannot be chosen as
  answer_
- **The cleaning service has a fee** corresponds
  with <a href='https://wiki.openstreetmap.org/wiki/Key:fee' target='_blank'>fee</a>
  =<a href='https://wiki.openstreetmap.org/wiki/Tag:fee%3Dyes' target='_blank'>yes</a>

This document is autogenerated from assets/layers/bike_cleaning/bike_cleaning.json