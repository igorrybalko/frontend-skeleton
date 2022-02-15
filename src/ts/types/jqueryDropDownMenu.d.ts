interface DropDownMenuOptions {
 time: number;
 parentSelector: string;
}

interface JQuery {
 dropDownMenu(options: DropDownMenuOptions): void;
}
