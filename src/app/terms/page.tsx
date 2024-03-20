import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '',
    description:
      '',
    openGraph: {
      title: '',
      description:
        '',
      url: process.env.HOST,
      siteName: '',
      images: [
        {
          url: `${process.env.HOST}/img/logo.png`,
          width: 362,
          height: 50,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default function Terms() {
  return (
    <div className="max-w-[1200px] my-4">
      
    </div>
  );
}
