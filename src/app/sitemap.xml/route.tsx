import { apolloServerClient } from '@/apollo-server-client';
import { graphql } from '@/gql';
import { SitemapDynamicRoutesQuery } from '@/gql/graphql';

const URL = process.env.HOST;
const date = new Date().toISOString()

function generateSiteMap(
  sessions: SitemapDynamicRoutesQuery['cinemaSessions'],
  films: SitemapDynamicRoutesQuery['films'],
) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
        <loc>${URL}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1</priority>
     </url>
     <url>
       <loc>${URL}/about</loc>
       <lastmod>${date}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
     </url>
      <url>
       <loc>${URL}/faq</loc>
       <lastmod>${date}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
     </url>
     <url>
       <loc>${URL}/terms</loc>
       <lastmod>${date}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
     </url>
     <url>
       <loc>${URL}/privacy-policy</loc>
       <lastmod>${date}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
     </url>
     ${sessions
       .map(({ ID }) => {
         return `
           <url>
            <loc>${`${URL}/sessions/${ID}`}</loc>
            <lastmod>${date}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
           </url>
         `;
       })
       .join('')}
     ${films
       .map(({ Slug }) => {
         return `
           <url>
              <loc>${`${URL}/films/${Slug}`}</loc>
              <lastmod>${date}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.8</priority>
           </url>
         `;
       })
       .join('')}
   </urlset>
 `;
}

const sitemapDynamicRoutesDocument = graphql(`
  query SitemapDynamicRoutes {
    films {
      Slug
    }
    cinemaSessions {
      ID
    }
  }
`);

export async function GET() {
  const client = apolloServerClient();
  const { data } = await client.query({ query: sitemapDynamicRoutesDocument });
  //   const posts = getSortedPostsData();
  const body = generateSiteMap(data.cinemaSessions, data.films);
  return new Response(body, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
