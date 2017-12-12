declare var jQuery:any;

export default class JqPlagins {

    constructor() {
        (function ($) {

            $.fn.simpleTabs = (options: object) => {

                let settings = $.extend({
                    'title' : '.nametab',
                    'content': '.contenttab',
                    'cb': '',
                    'activeHead': 'actheadtab',
                    'activeContent': 'activetab'
                }, options);

                let nametab = $(this).find(settings.title), /*селектор имен табов*/
                    contenttab = $(this).find(settings.content),/*селектор содержимого табов*/
                    tabsBlock = this;
                nametab.on('click', function () {
                    let activeClass = $(this).hasClass(settings.activeHead);/*является ли имя таба активным?*/
                    if (!activeClass) {
                        let ind = $(this).index();
                        $(tabsBlock).find('.' + settings.activeHead).removeClass(settings.activeHead);
                        $(this).addClass(settings.activeHead);
                        $(tabsBlock).find('.' + settings.activeContent).removeClass(settings.activeContent);
                        contenttab.eq(ind).addClass(settings.activeContent);
                        if (settings.cb) {
                            settings.cb();
                        }
                    }
                });
            };

            $.fn.simpleAccordion = (options: object) => {

                let settings = $.extend({
                    'title' : '.title-acc',
                    'content': '.content-acc',
                    'cb': '',
                    'speed': 400
                }, options);

                let acctitle = $(this).find(settings.title);

                acctitle.click(function(){
                    if(!$(this).next().is(':visible')) {
                        $(settings.content).slideUp(settings.speed);
                        $(settings.title).removeClass('active');
                    }
                    $(this).next().stop().slideToggle(settings.speed);
                    $(this).toggleClass('active');
                    if(settings.cb){
                        settings.cb();
                    }
                });
            };

            //drop down menu
            $.fn.dropDownMenu = (options: object) => {

                let settings = $.extend({
                    'time': 100,
                    'parentSelector': '.parent'
                }, options);

                let itemMenu = $(this).find(settings.parentSelector),
                    close:any,
                    flag:any;

                function closeLinks(that:any){
                    close = setTimeout(() =>{
                        $(that).find('ul').removeClass('openhover');
                    }, settings.time);
                    flag = that;
                }

                itemMenu.on('mouseenter', function(){
                    if(flag === this){
                        clearTimeout(close);
                    }
                    $(this).find('ul').addClass('openhover');
                });

                itemMenu.on('mouseleave', function(){
                    let self:any = this;
                    closeLinks(self);
                });
            };

        })(jQuery);
    }
}