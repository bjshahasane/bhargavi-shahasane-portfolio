  export const productionSteps = [
  {
    title: "Order Creation",
    desc: "User creates an order using a modal-based UI with product catalogue selection.",
    highlight: "Handles dynamic product arrays + real-time totals",
  },
  {
    title: "Queue Synchronization",
    desc: "Each product is mapped to a centralized production queue entry.",
    highlight: "Prevents duplicate tracking across orders",
  },
  {
    title: "Pending Calculation",
    desc: "Pending quantities auto-update when orders are created, edited, or deleted.",
    highlight: "Core logic ensures data consistency",
  },
  {
    title: "Production Tracking",
    desc: "Kitchen updates completed quantities from a single controlled interface.",
    highlight: "Avoids scattered updates across system",
  },
  {
    title: "Fulfillment Sync",
    desc: "Marking orders as fulfilled updates production data accordingly.",
    highlight: "Bi-directional data sync (orders ↔ production)",
  },
  {
    title: "Analytics Layer",
    desc: "Data is aggregated into charts showing trends across time.",
    highlight: "Transforms raw data into business insights",
  },
];

export const posSteps = [
  
  {
    title: "Menu Management",
    desc: "Admin can create, update, and organize product catalogue.",
    highlight: "Dynamic menu rendering",
  },
  {
    title: "Order Processing",
    desc: "Orders are created with multiple products and live calculations.",
    highlight: "Handles nested product structures",
  },
  {
    title: "Order Editing",
    desc: "Orders can be modified via modal without breaking data integrity.",
    highlight: "Complex state handling in UI",
  },
  {
    title: "Production Integration",
    desc: "Orders directly impact the production queue automatically.",
    highlight: "Bridges frontend actions with backend logic",
  },
  {
    title: "Dashboard Insights",
    desc: "Admins can track order trends and product demand visually.",
    highlight: "Business-focused UX decisions",
  },
];