import {
  Zap,
  Shield,
  Users,
  BarChart,
  Sparkles,
  Lock,
} from 'lucide-react';
import type {
  PricingTier,
  Benefit,
  HowItWorksStep,
  Testimonial,
  FAQ,
  Partner,
} from '@/types';

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 100,
    currency: 'USD',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 team members',
      '10 GB storage',
      'Basic analytics',
      'Email support',
      'Custom branding',
      '99.9% uptime SLA',
    ],
    cta: 'Get Started',
    popular: false,
    href: '/signup',
  },
  {
    name: 'Professional',
    price: 200,
    currency: 'USD',
    description: 'For growing teams that need more power',
    features: [
      'Up to 20 team members',
      '100 GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      '99.9% uptime SLA',
      'API access',
      'Advanced integrations',
    ],
    cta: 'Get Started',
    popular: true,
    href: '/signup',
  },
  {
    name: 'Enterprise',
    price: 300,
    currency: 'USD',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Custom analytics',
      '24/7 phone support',
      'Custom branding',
      '99.99% uptime SLA',
      'API access',
      'Advanced integrations',
      'Dedicated account manager',
      'Custom training',
    ],
    cta: 'Contact Sales',
    popular: false,
    href: '/signup',
  },
];

export const benefits: Benefit[] = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built on modern infrastructure for blazing fast performance. Your team will love the speed.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description:
      'Enterprise-grade security with end-to-end encryption. Your data is always protected.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with real-time collaboration features and role-based permissions.',
  },
  {
    icon: BarChart,
    title: 'Powerful Analytics',
    description:
      'Get insights into your content performance with comprehensive analytics and reporting.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description:
      'Leverage artificial intelligence to automate workflows and boost productivity.',
  },
  {
    icon: Lock,
    title: 'Role-Based Access',
    description:
      'Fine-grained control over who can access what with flexible role-based permissions.',
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Sign Up',
    description:
      'Create your account in seconds. No credit card required to get started.',
  },
  {
    step: 2,
    title: 'Set Up Your Workspace',
    description:
      'Customize your workspace, invite team members, and configure your preferences.',
  },
  {
    step: 3,
    title: 'Start Creating',
    description:
      'Begin creating and managing your content. Our intuitive interface makes it easy.',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    quote:
      'This platform has transformed how we manage our content. The collaboration features are game-changing.',
    avatar: '/avatars/avatar-1.jpg',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'StartupXYZ',
    quote:
      'The best CMS we\'ve used. Fast, reliable, and the support team is incredibly helpful.',
    avatar: '/avatars/avatar-2.jpg',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Content Lead',
    company: 'MediaHub',
    quote:
      'Intuitive interface, powerful features. Our team was up and running in minutes.',
    avatar: '/avatars/avatar-3.jpg',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'CTO',
    company: 'InnovateLab',
    quote:
      'Security and performance are top-notch. Exactly what we needed for our enterprise needs.',
    avatar: '/avatars/avatar-4.jpg',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'Operations Manager',
    company: 'GlobalCo',
    quote:
      'The role-based permissions and analytics have streamlined our entire workflow.',
    avatar: '/avatars/avatar-5.jpg',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Creative Director',
    company: 'DesignStudio',
    quote:
      'A pleasure to use. Beautiful interface meets powerful functionality.',
    avatar: '/avatars/avatar-6.jpg',
    rating: 5,
  },
];

export const faqs: FAQ[] = [
  {
    question: 'How do I get started?',
    answer:
      'Simply sign up for a free account, set up your workspace, and start creating. No credit card required for the trial period.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades will be processed at the end of your billing cycle.',
  },
  {
    question: 'What happens to my data if I cancel?',
    answer:
      'You can export all your data before canceling. After cancellation, your data is retained for 30 days in case you want to reactivate your account.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes, we offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, contact our support team for a full refund.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use enterprise-grade encryption, regular security audits, and comply with GDPR, SOC 2, and other security standards.',
  },
  {
    question: 'Can I integrate with other tools?',
    answer:
      'Yes, we offer integrations with popular tools and a robust API for custom integrations. Professional and Enterprise plans include advanced integration options.',
  },
];

export const partners: Partner[] = [
  { name: 'Google', logo: '/logos/google.svg' },
  { name: 'Microsoft', logo: '/logos/microsoft.svg' },
  { name: 'Amazon', logo: '/logos/amazon.svg' },
  { name: 'Salesforce', logo: '/logos/salesforce.svg' },
  { name: 'IBM', logo: '/logos/ibm.svg' },
  { name: 'Oracle', logo: '/logos/oracle.svg' },
  { name: 'SAP', logo: '/logos/sap.svg' },
  { name: 'Adobe', logo: '/logos/adobe.svg' },
];
