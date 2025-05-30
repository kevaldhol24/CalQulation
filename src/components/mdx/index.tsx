import Image from "next/image";
import Link from "next/link";
import ComparisonTable from "./ComparisonTable";
import Callout from "./Callout";
import FeatureCard from "./FeatureCard";
import PullQuote from "./PullQuote";
import StatCard from "./StatCard";
import Step from "./Step";
import ProCon from "./ProCon";
import ConclusionBox from "./ConclusionBox";
import TableOfContents from "./TableOfContents";
import {
  FiActivity,
  FiCheckCircle,
  FiDollarSign,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import BlogHero from "./BlogHero";

// Enhanced styling for basic HTML elements in MDX
const CustomH1 = (props) => (
  <h1
    className="text-4xl font-bold mt-8 mb-6 text-gray-900 dark:text-gray-50 border-b pb-2 border-gray-200 dark:border-gray-700"
    {...props}
  />
);

const CustomH2 = (props) => (
  <h2
    className="text-3xl font-bold mt-10 mb-4 text-gray-800 dark:text-gray-100"
    {...props}
  />
);

const CustomH3 = (props) => (
  <h3
    className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200"
    {...props}
  />
);

const CustomP = (props) => (
  <p
    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
    {...props}
  />
);

const CustomUl = (props) => (
  <ul
    className="list-disc pl-8 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
    {...props}
  />
);

const CustomOl = (props) => (
  <ol
    className="list-decimal pl-8 mb-6 text-gray-700 dark:text-gray-300 space-y-2"
    {...props}
  />
);

const CustomLi = (props) => <li className="text-lg mb-2" {...props} />;

const CustomBlockquote = (props) => (
  <blockquote
    className="pl-4 border-l-4 border-primary italic text-gray-700 dark:text-gray-300 my-6"
    {...props}
  />
);

const CustomHr = () => (
  <hr className="my-10 border-gray-200 dark:border-gray-800" />
);

const CustomA = (props) => (
  <a
    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
    {...props}
  />
);

const CustomTable = (props) => (
  <div className="overflow-x-auto my-8">
    <table
      className="w-full border-collapse border border-gray-200 dark:border-gray-800"
      {...props}
    />
  </div>
);

const CustomThead = (props) => (
  <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
);

const CustomTr = (props) => (
  <tr className="border-b border-gray-200 dark:border-gray-800" {...props} />
);

const CustomTh = (props) => (
  <th
    className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
    {...props}
  />
);

const CustomTd = (props) => (
  <td
    className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"
    {...props}
  />
);

const CustomCode = (props) => (
  <code
    className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200 text-sm font-mono"
    {...props}
  />
);

const CustomPre = (props) => (
  <pre
    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm my-6"
    {...props}
  />
);

const MDXComponents = {
  // Icons
  FiActivity,
  FiCheckCircle,
  FiDollarSign,
  FiShield,
  FiTrendingUp,

  // Next.js components
  Link,
  Image,

  // Custom components
  ComparisonTable,
  Callout,
  FeatureCard,
  PullQuote,
  StatCard,
  Step,
  ProCon,
  ConclusionBox,
  BlogHero,
  TableOfContents,

  // Enhanced HTML elements
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  p: CustomP,
  ul: CustomUl,
  ol: CustomOl,
  li: CustomLi,
  blockquote: CustomBlockquote,
  hr: CustomHr,
  a: CustomA,
  table: CustomTable,
  thead: CustomThead,
  tr: CustomTr,
  th: CustomTh,
  td: CustomTd,
  code: CustomCode,
  pre: CustomPre,
};

export default MDXComponents;
