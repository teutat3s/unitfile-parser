import chevrotain from "chevrotain";
const { CstParser } = chevrotain; 
import {
  tokens,
  Comment,
  CommentStart,
  CommentStartNewline,
  Property,
  SectionHeading,
  Value,
} from "./Lexer.mjs";

export default class UnitFileParser extends CstParser {
  constructor() {
    super(tokens);
    const $ = this;

    $.RULE("commentLine", () => {
      $.CONSUME(CommentStartNewline);
      $.CONSUME(Comment);
    });

    $.RULE("comment", () => {
      $.CONSUME(CommentStart);
      $.CONSUME(Comment);
    });

    $.RULE("value", () => {
      $.CONSUME(Value);
    });

    $.RULE("sectionHeadingStatement", () => {
      $.CONSUME(SectionHeading);
      $.OPTION(() => {
        $.SUBRULE($.comment);
      });
    });

    $.RULE("propertyStatement", () => {
      $.CONSUME(Property);
      $.SUBRULE($.value);
      $.OPTION(() => {
        $.SUBRULE($.comment);
      });
    });

    $.RULE("sectionStatement", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.propertyStatement) },
        { ALT: () => $.SUBRULE($.commentLine) },
      ]);
    });
    
    $.RULE("section", () => {
      $.SUBRULE($.sectionHeadingStatement);
      $.MANY(() => {
        $.SUBRULE($.sectionStatement);
      });
    });

    $.RULE("unitFile", () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.section) },
          { ALT: () => $.SUBRULE($.comment) },
        ]);
      });
    });

    this.performSelfAnalysis();
  }
}
