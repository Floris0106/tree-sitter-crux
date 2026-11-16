/**
 * @file Crux grammar for tree-sitter
 * @author Floris van Onna
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "crux",

  rules: {
    source_file: $ => ""
  }
});

/**
 * Creates a rule to match one or more occurrences of the rule separated by the separator.
 *
 * @param {RuleOrLiteral} rule - The rule to match one or more times.
 * @param {RuleOrLiteral} sep - The separator to interleave between occurrences of the rule.
 *
 * @returns {SeqRule}
 */
function sepBy1(rule, sep) {
  return seq(rule, repeat(seq(sep, rule)));
}

/**
 * Creates a rule to match zero or more occurrences of the rule separated by the separator.
 *
 * @param {RuleOrLiteral} rule - The rule to match zero or more times.
 * @param {RuleOrLiteral} sep - The separator to interleave between occurrences of the rule.
 *
 * @returns {ChoiceRule}
 */
function sepBy(rule, sep) {
  return optional(sepBy1(rule, sep));
}
