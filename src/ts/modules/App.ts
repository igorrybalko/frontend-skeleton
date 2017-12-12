import  AppHelper from './AppHelper';
import JqPlugins from './JqPlugins';
declare var jQuery:any;
import 'slick-carousel';

let appHelper = new AppHelper;
let plugins = new JqPlugins;

export default class App{

    constructor(){

        ($ =>{

            $(()=> {

                appHelper.modal();


            });

        })(jQuery);

    }
}