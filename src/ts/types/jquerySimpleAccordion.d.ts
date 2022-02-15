interface SimpleAccordionOptions {
 title?: string;
 content?: string;
 cb?: () => void;
 speed?: number;
}

interface JQuery {
 simpleAccordion(options: SimpleAccordionOptions): void;
}
