interface SimpleTabsOptions {
 title?: string;
 content?: string;
 cb?: () => void;
 activeHead?: string;
 activeContent?: string;
}

interface JQuery {
 //simpleTabs(): void;
 simpleTabs(options: SimpleTabsOptions): void;
}
