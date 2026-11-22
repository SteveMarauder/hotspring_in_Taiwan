# Assets and sources

## Hero

`dist/assets/spring-hero.webp`: generated with the built-in image_gen tool, 2026-11-22. This is an imagined scene, not a named property. The original PNG is retained in `dist/assets/spring-hero.png`.

Exact generation prompt:

> Use case: photorealistic-natural. Asset type: wide cinematic hero background for a Taiwan hot spring travel discovery website. Create a tranquil editorial travel photograph of a hypothetical unbranded open-air hot spring pool in Taiwan's lush subtropical mountain valley, viewed from the edge of the pool. Still muted jade water in foreground, small natural dark stone edges, delicate drifting steam, layered forest mountains receding into soft morning mist, a modest sliver of warm cedar architecture at far right, lush fern and broadleaf vegetation. Elevated premium travel magazine art direction, realistic natural texture, soft morning sunlight, rich deep green and restrained blue-gray hues, quiet and human scale. Wide panoramic landscape 3:1 composition, clear restful middle-left area with darker forest and water for white heading overlay. No people, no logos, no lettering, no watermark, no Japanese temple gates, no Mount Fuji. This is an imagined atmospheric scene, not a real named hotel.

## Original vectors

Favicon, icons and the approximate Taiwan schematic are authored in the project. Schematic coordinates are deliberately approximate and unsuitable for navigation. Region-card illustrations have been replaced by linked official-site property photographs.

## Map library

Leaflet 1.9.4, BSD-2-Clause. Included license: `dist/assets/LEAFLET-LICENSE.txt`.

- <https://leafletjs.com/>
- <https://github.com/Leaflet/Leaflet/tree/v1.9.4>

Street tiles are loaded on demand from OpenStreetMap and display attribution. No tile downloads or offline tile caches are bundled. Observe <https://operations.osmfoundation.org/policies/tiles/> before production use.

## Content

Area classification: <https://taiwanhotspring.net/SpringArea-Intro.aspx?a=50&l=1>. Property-specific official sources are in `dist/data.js` and exposed in each detail dialog. Foreign names and descriptions are editorial translations unless the official name was available. No reviews, star ratings or guest testimonials are copied.

## Property photographs

The 12 property photographs load externally from official hotel/bathhouse sites or their official CDNs. No third-party photograph binaries are included in the repository. Each detail dialog credits the source and links to the original image and official page. Copyright remains with the respective rights holders; attribution does not imply a reuse licence or endorsement. See `PHOTO_SOURCES.md` and `dist/photos.js` for the full list. Replace external links with owner-authorised assets if stable local hosting is required.
