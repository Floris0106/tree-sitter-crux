/**
 * @file Crux grammar for tree-sitter
 * @author Floris van Onna
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "crux",

  extras: $ => [
    /\s+/u,
  ],

  supertypes: $ => [
    $.declaration,
  ],

  word: $ => $.identifier,

  rules: {
    source_file: $ => seq(
      optional(field("namespace", $.top_level_namespace)),
      repeat($.declaration)
    ),
    top_level_namespace: $ => seq(
      "namespace",
      field("name", $._name),
      ";"
    ),

    declaration_list: $ => seq(
      "{",
      repeat($.declaration),
      "}"
    ),
    declaration: $ => choice(
      $.namespace_declaration,
      $.using_declaration,
    ),

    namespace_declaration: $ => seq(
      "namespace",
      field("name", $._name),
      $.declaration_list
    ),

    using_declaration: $ => seq(
      "using",
      field("name", $._name),
      ";"
    ),

    _name: $ => choice(
      $.qualified_name,
      $._simple_name,
    ),
    qualified_name: $ => seq(
      field("qualifier", $._name),
      "::",
      field("name", $._simple_name)
    ),
    _simple_name: $ => choice(
      $.identifier,
    ),

    identifier: $ => /[_\p{XID_Start}][_\p{XID_Continue}]*/u,
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
