export default class JqPlugins {
 constructor() {
  (($) => {
   $.fn.simpleTabs = function (options: SimpleTabsOptions) {
    let settings: SimpleTabsOptions = $.extend(
     {
      title: '.nametab',
      content: '.contenttab',
      cb: null,
      activeHead: 'actheadtab',
      activeContent: 'activetab',
     },
     options
    );

    let nametab = $(this).find(settings.title) /*селектор имен табов*/,
     contenttab = $(this).find(settings.content) /*селектор содержимого табов*/,
     tabsBlock = this;
    nametab.on('click', function () {
     let activeClass = $(this).hasClass(
      settings.activeHead
     ); /*является ли имя таба активным?*/
     if (!activeClass) {
      let ind = $(this).index();
      $(tabsBlock)
       .find('.' + settings.activeHead)
       .removeClass(settings.activeHead);
      $(this).addClass(settings.activeHead);
      $(tabsBlock)
       .find('.' + settings.activeContent)
       .removeClass(settings.activeContent);
      contenttab.eq(ind).addClass(settings.activeContent);
      if (settings.cb) {
       settings.cb();
      }
     }
    });
   };

   $.fn.simpleAccordion = function (options: SimpleAccordionOptions) {
    let settings: SimpleAccordionOptions = $.extend(
     {
      title: '.title-acc',
      content: '.content-acc',
      cb: null,
      speed: 400,
     },
     options
    );

    let acctitle = $(this).find(settings.title);

    acctitle.on('click', function () {
     if (!$(this).next().is(':visible')) {
      $(settings.content).slideUp(settings.speed);
      $(settings.title).removeClass('active');
     }
     $(this).next().stop().slideToggle(settings.speed);
     $(this).toggleClass('active');
     if (settings.cb) {
      settings.cb();
     }
    });
   };

   //drop down menu
   $.fn.dropDownMenu = function (options: DropDownMenuOptions) {
    let settings: DropDownMenuOptions = $.extend(
     {
      time: 100,
      parentSelector: '.parent',
     },
     options
    );

    let itemMenu = $(this).find(settings.parentSelector),
     close: any,
     flag: HTMLElement;

    function closeLinks(that: HTMLElement) {
     close = setTimeout(() => {
      $(that).find('ul').removeClass('openhover');
     }, settings.time);
     flag = that;
    }

    itemMenu.on('mouseenter', function () {
     if (flag === this) {
      clearTimeout(close);
     }
     $(this).find('ul').addClass('openhover');
    });

    itemMenu.on('mouseleave', function () {
     let self: HTMLElement = this;
     closeLinks(self);
    });
   };
  })(jQuery);
 }
}
