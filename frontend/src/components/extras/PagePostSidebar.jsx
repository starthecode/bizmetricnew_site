import React from 'react';
import YoutubeEmbedVideo from './embed/YoutubeEmbedVideo';
import { Link } from 'react-router-dom';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { PrimaryButton } from '../Buttons/PrimaryButton';

const blogs = [
  {
    title: '6 Reasons to use Power BI as a Business Intelligence Solution',
    image: 'https://picsum.photos/80/80?random=1',
  },
  {
    title:
      'Accelerate Lakehouse Journey with Bizmetric Databricks-Powered Ingestion & Quality Framework',
    image: 'https://picsum.photos/80/80?random=2',
  },
  {
    title: 'Advanced Analytics – what lies today and what tomorrow will bring',
    image: 'https://picsum.photos/80/80?random=3',
  },
  {
    title: 'Advanced Analytics & its relevance in Manufacturing Industry',
    image: 'https://picsum.photos/80/80?random=4',
  },
  {
    title: 'AIOps Use Cases to Enhance IT Operations Productivity',
    image: 'https://picsum.photos/80/80?random=5',
  },
];

export default function PagePostSidebar() {
  return (
    <div className="mt-5 w-full lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
      <div className="space-y-7 lg:sticky lg:top-7">
        {/* Author Profile */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="flex space-x-3">
              <YoutubeEmbedVideo videoId={'arHVxppz_iw'} />
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold">Newsletters Archive</h3>
          <TitleLine />
          <nav className="space-y-2">
            {/* This would be generated from your post headings */}
            <ul className="leading-normal flex flex-col gap-3">
              {['2025', '2024', '2023'].map((item, index) => (
                <li key={index}>
                  <Link
                    className="flex items-center gap-3 font-semibold text-lg"
                    to={'/'}
                  >
                    <span className="w-[100px] h-[2px] bg-gradient-to-tr from-flamingo-600 via-flamingo-100/20 to-white" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Trending Posts */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">Recent Blogs</h3>

              <Link to={'/'}>
                <SecondaryButton title={'View All'} link={'/'} />
              </Link>
            </div>
            <TitleLine />
            <div className=" flex flex-col gap-4">
              {blogs.map((blog, idx) => (
                <Link
                  to={'/'}
                  key={idx}
                  className="group flex gap-4 items-start"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <p className="group-hover:text-flamingo-500 text-base text-gray-800 leading-snug">
                    {blog.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4"></div>
        </div>
        {/* Newsletter */}
        <div className="max-w-5xl md:p-12 p-6 mx-auto rounded-2xl overflow-hidden bg-gradient-to-r from-[#130135] to-junglegreen-600 shadow-2xl shadow-blue-500/20">
          <p className="text-white dark:text-gray-300 text-sm mb-4">
            Stay up to date with our latest news and services.
          </p>
          <form className="space-y-3 flex flex-col items-center">
            <input
              type="email"
              value={null}
              onChange={() => null}
              placeholder="Your email address"
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 bg-transparent rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <PrimaryButton type={'submit'} title={'Subscribe'} />
          </form>
        </div>
      </div>
    </div>
  );
}

export const TitleLine = () => {
  return (
    <div className="block mt-3 mb-5">
      <div className="w-auto h-[2px] bg-gradient-to-tr from-junglegreen-600 via-junglegreen-100/20 to-white" />
    </div>
  );
};
