const baseSchema = `

  extend type Query {
    budgetHistory: [SimpleBudgetDetail]!
    budgetSummary ( breakdown: String!, maxCategories: Int ): [SimpleBudgetSummary]!
    budgetCashFlow ( accountType: String! ): [BudgetCashFlow]!  
  }
`;

const schema = [
  require('./budget_schema.js'),
  baseSchema];

module.exports = schema;
