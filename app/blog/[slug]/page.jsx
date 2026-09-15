import ArticleView from '../../../components/ArticleView.jsx';
import { ARTICLES } from '../../../data/articles.js';

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }) {
  const { slug } = params;
  return <ArticleView slug={slug} />;
}
