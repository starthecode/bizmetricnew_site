import React from 'react';
import { Heading } from './Heading/Heading';
import BlogCard from './Cards/BlogCard';
import BlogSearch from './Search/BlogSearch';
import Tags from './extras/Tags';
import SubscribeBox from './extras/SubscribeBox';
import { Link } from 'react-router-dom';
import { SecondaryButton } from './Buttons/SecondaryButton';

const BlogArchive = ({ data }) => {
  return (
    <>
      <section className=" pb-20">
        <div
          className="relative py-0 sm:py-0 md:pt-24 lg:pt-24 xl:pt-24 overflow-hidden z-10"
          style={{
            backgroundImage: `url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container">
            <div className="w-full flex flex-col justify-center items-center mb-20">
              <div className="grid mx-auto w-full justify-center items-center mb-5 mt-10">
                {/* <Breadcrumbs capitalizeLinks /> */}
                <Heading smallTitle={'Blog'} title={'Tech Talk & Blogs'} />
              </div>
              <div className="contents mx-auto w-full gap-5 justify-cennter items-center text-center mt-4">
                <BlogSearch />
              </div>
            </div>
          </div>
        </div>

        <div className="px-40 flex flex-col">
          <div className="mt-10">
            <Tags />
            <div
              className="grid lg:grid-cols-3 grid-cols-1 gap-10 items-center"
              data-aos="fade-up"
              data-aos-duration="300"
            >
              {data?.slice(0, 1).map((item, index) => (
                <div key={index} className="lg:col-span-2">
                  <div className="grid md:grid-cols-5 gap-10">
                    <div className="md:col-span-2 col-span-3">
                      <img
                        width={300}
                        height={300}
                        src={item?.image}
                        alt={item.title}
                        className="w-auto h-auto rounded-md"
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="flex flex-col gap-5 justify-between xl:h-full">
                        <div>
                          {item?.category.map((cat, idx) => (
                            <span
                              key={idx}
                              className="bg-flamingo-100 text-xs text-flamingo-500 font-semibold px-2 py-1 rounded-full"
                            >
                              {cat}
                            </span>
                          ))}

                          <h1 className="text-lg my-3 transition-all hover:text-primary">
                            <Link to={''}>{item.title}</Link>
                          </h1>
                          {/* <p className="text-sm/relaxed tracking-wider text-gray-500">
                            {node?.excerpt?.length > 100
                              ? `${node?.excerpt
                                  .replace(/<[^>]*>?/gm, '')
                                  .substring(0, 90)}...`
                              : node?.excerpt}

                            <a href="#" className="text-primary">
                              read more
                            </a>
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <SubscribeBox />
            </div>
          </div>
        </div>
        <div className="grid flex-col justify-center items-center w-full gap-5 mt-28 bg-woodsmoke-300/20 px-40 py-20">
          <div className="flex justify-between w-full">
            <div className="w-full">
              <Heading
                type={'dark'}
                classes={'items-start text-left'}
                smallTitle={'News'}
                title={'Bizmetric in News'}
              />
            </div>
            <div className="w-1/2 flex justify-end">
              <SecondaryButton title={'View More'} />
            </div>
          </div>
          <div className="flex gap-5">
            {data?.slice(0, 3).map((item, index) => (
              <BlogCard key={index} type={2} item={item} />
            ))}
          </div>
        </div>

        <div className="px-40 flex gap-5 mt-20 justify-center">
          {data?.slice(0, 3).map((item, index) => (
            <BlogCard key={index} type={2} item={item} />
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 mt-10">
          <div className="flex items-center">
            <a
              href=""
              className="border border-gray-300 rounded-md text-sm tracking-wider transition-all duration-150 hover:shadow-lg focus:shadow-lg py-2 px-3"
            >
              <i className="fa-solid fa-arrow-left me-2"></i> Previous
            </a>
          </div>
          <div className="flex items-center">
            <a
              href=""
              className="border border-gray-300 rounded-md text-sm tracking-wider transition-all duration-150 hover:shadow-lg focus:shadow-lg py-2 px-3"
            >
              Next <i className="fa-solid fa-arrow-right ms-2"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogArchive;
