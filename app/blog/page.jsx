import { Suspense } from 'react';
import BlogPage from '../../components/BlogPage.jsx';

export default function Blog() {
  return (
    <Suspense fallback={null}>
      <BlogPage />
    </Suspense>
  );
}
