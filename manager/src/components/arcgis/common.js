import * as esriLoading from 'esri-loader'
import store from '@/store/'
import config from '@/defaultSetting.ts'
export function importEsri(cb) {
    console.log(esriLoading, 'esriLoading')
    esriLoading.loadCss(config.esriCss)
    esriLoading.loadScript(config.esriJs)
    esriLoading
        .loadModules([
            'esri/Basemap',
            'esri/Map',
            'esri/views/MapView',
            'esri/layers/FeatureLayer',
            'esri/widgets/LayerList',
            'esri/layers/MapImageLayer',
            'esri/config',
            'esri/layers/TileLayer',
            'esri/symbols/TextSymbol',
            'esri/widgets/Legend',
            'esri/widgets/Expand',
            'esri/widgets/Compass',
            'esri/widgets/ScaleBar',
            'esri/tasks/FindTask',
            'esri/tasks/support/FindParameters',
            'esri/symbols/SimpleLineSymbol',
            'esri/Color',
            'esri/geometry/Point',
            'esri/geometry/Extent'
        ])
        .then(
            ([
                Basemap,
                Map,
                MapView,
                FeatureLayer,
                LayerList,
                MapImageLayer,
                esriConfig,
                TileLayer,
                TextSymbol,
                Legend,
                Expand,
                Compass,
                ScaleBar,
                FindTask,
                FindParameters,
                SimpleLineSymbol,
                Color,
                Point,
                Extent
            ]) => {
                esriConfig.fontsUrl = config.esriFont
                const esri = {
                        Basemap: Basemap,
                        Map: Map,
                        MapView: MapView,
                        FeatureLayer: FeatureLayer,
                        LayerList: LayerList,
                        MapImageLayer: MapImageLayer,
                        esriConfig: esriConfig,
                        TileLayer: TileLayer,
                        TextSymbol: TextSymbol,
                        Legend: Legend,
                        Expand: Expand,
                        Compass: Compass,
                        ScaleBar: ScaleBar,
                        FindTask: FindTask,
                        FindParameters: FindParameters,
                        SimpleLineSymbol: SimpleLineSymbol,
                        Color: Color,
                        Point: Point,
                        Extent: Extent
                    }
                    // store.dispatch('InitEsriMap', esri)
                cb(esri)
            }
        )
}