This package is configured to develop a frontend for sass, typescript and pug. Gulp and Webpack compile files
##Installation options
- Clone the repo: `git clone https://github.com/igorrybalko/frontend-skeleton.git`
- Install with [npm](https://www.npmjs.com/): `npm install frontend-skeleton`
##Use
- Bootstrap 4
- jQuery
- Slick-carousel
##Main structure
```
frontend-skeleton/
├── images/
│    ├── marker.png
│    └── noimage.png
└── src/
    ├── pug/
    │    ├── includes/
    │    │    ├── footer.pug
    │    │    ├── head.pug
    │    │    └── header.pug
    │    └── pages/
    │          └── index.pug
    ├── scss/
    │    ├── core/
    │    │    ├── common.scss
    │    │    ├── mixins.scss
    │    │    ├── user_text.scss
    │    │    └── vars.scss
    │    ├── modules/
    │    │    ├── footer.scss
    │    │    ├── header.scss
    │    │    └── homepage.scss
    │    └── main.scss
    └── ts
          ├── modules/
          │    ├── App.ts
          │    ├── AppHelper.ts
          │    └── JqPlugins.ts
          └── index.ts
```
##Docs
https://wolfweb.com.ua/verstka/frontend-sborka-web-prilozheniya/
##Author
http://www.linkedin.com/in/igorrybalko