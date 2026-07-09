export interface Product {
  id: string;
  title: string;
  description: string;
  status: string;
  featured: boolean;
  featuredDescription?: string;
  featuredStatus?: string;
  /** Optional detail fields surfaced on the projects page. */
  technology?: string;
  impact?: string;
}

export const products: Product[] = [
  {
    id: 'aria',
    title: 'ARIA',
    description: 'AI Executive Assistant',
    featuredDescription: 'ARIA helps teams transform meetings, knowledge, and daily operations into organized, actionable information through AI-assisted workflows.',
    status: 'Launching',
    featuredStatus: 'Launching July 2026',
    featured: true,
  },
  {
    id: 'katon-command-center',
    title: 'KATON COMMAND CENTER',
    description: 'AI-Native Knowledge Operating System',
    status: 'Active',
    featured: false,
  },
  {
    id: 'portal-internal',
    title: 'Portal Internal',
    description: 'Google Workspace Collaboration Portal',
    status: 'Active',
    featured: false,
  },
  {
    id: 'google-workspace',
    title: 'Google Workspace',
    description: 'Digital Workplace Modernization',
    status: 'Active',
    featured: false,
  }
];
