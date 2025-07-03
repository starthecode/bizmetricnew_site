import { Heading3 } from '@/components/Headings/Heading3';
import React from 'react';

export const HeroSection = ({ title, excerpt }: any) => {
  return (
    <div>
      <div className="h-96 w-[80%] mx-auto flex flex-col items-center justify-center relative">
        <div className="parent flex flex-col items-center justify-center mb-10 mt-32">
          <div className="pointer_lable flex justify-center w-full absolute top-0 left-[50px] right-0">
            <div
              className="absolute mx-auto animate-float rounded-md bg-red-600"
              style={{
                top: '15rem',
                left: '60rem',
                transform:
                  'translateX(3.72556px) translateY(-13.6604px) translateZ(0px)',
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-4 w-4 absolute transform -rotate-90 -top-4 -left-4 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
              </svg>
              <p className="text-xs rounded-md px-1 py-1 !text-white bg-red-600">
                Data Science
              </p>
            </div>

            <div
              className="absolute mx-auto animate-float rounded-md"
              style={{
                top: '15rem',
                left: '0rem',
                transform:
                  'translateX(0px) translateY(.83019px) translateZ(0px)',
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-4 w-4 absolute transform -top-4 -right-4 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
              </svg>
              <p className="text-xs rounded-md px-1 py-1 !text-white bg-blue-600">
                Development
              </p>
            </div>

            <div
              className="absolute mx-auto animate-float rounded-md"
              style={{
                top: '6.18322rem',
                left: '5.72949rem',
                transform:
                  'translateX(0.0250712px) translateY(0.0167141px) translateZ(0px)',
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-4 w-4 absolute transform rotate-90 -bottom-4 -right-4 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
              </svg>
              <p className="text-xs rounded-md px-1 py-1 !text-white bg-purple-600">
                Machine Learning
              </p>
            </div>

            <div
              className="absolute mx-auto animate-float rounded-md"
              style={{
                top: '0.734152rem',
                left: '20.7295rem',
                transform: 'none',
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-4 w-4 absolute transform rotate-90 -bottom-4 -right-4 text-pink-600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
              </svg>
              <p className="text-xs rounded-md px-1 py-1 !text-white bg-pink-600">
                Sales & Marketing
              </p>
            </div>

            <div
              className="absolute mx-auto animate-float rounded-md"
              style={{
                top: '0.734152rem',
                left: '39.2705rem',
                transform:
                  'translateX(0.192547px) translateY(0.0213941px) translateZ(0px)',
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-4 w-4 absolute transform rotate-180 -bottom-4 -left-4 text-red-700"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
              </svg>
              <p className="text-xs rounded-md px-1 py-1 !text-white bg-red-700">
                Project Manager
              </p>
            </div>

            <div
              className="absolute mx-auto animate-float rounded-md"
              style={{
                top: '6.18322rem',
                left: '54.2705rem',
                transform:
                  'translateX(0.12546px) translateY(-0.052825px) translateZ(0px)',
              }}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-4 w-4 absolute transform rotate-180 -bottom-4 -left-4 text-lime-600"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
              </svg>
              <p className="text-xs rounded-md px-1 py-1 !text-white bg-lime-600">
                IT & Networking
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center text-center">
            <div className="w-[750px]">
              <Heading3
                small={'Careers'}
                main={title}
                specialTitle={''}
                classes={'font-inter'}
                desc={excerpt}
              />{' '}
            </div>
          </div>
        </div>
        <div className="w-fit relative ring-ebony-200 dark:ring-white/10 ring-1 p-2 rounded-xl bg-gradient-to-t from-onyx-900">
          <div className="grid items-center p-2 gap-12 ring-ebony-400 dark:ring-white/10 ring-1 rounded-2xl bg-ebony-200/5 shadow-massive">
            <form className="mx-auto w-full relative z-10 flex flex-col justify-between rounded-lg p-2 sm:flex-row sm:items-center sm:p-0">
              <div className="flex">
                <label
                  className="focus-within:ring h-14 rounded-md ring-onyx-200"
                  htmlFor="category"
                >
                  <select
                    className="bg-transparent w-fit px-2 py-4 outline-none"
                    name="category"
                    id="category"
                  >
                    <option className="text-black" value="All">
                      Location
                    </option>
                    <option className="text-black" value="All">
                      location one
                    </option>
                    <option className="text-black" value="All">
                      location two
                    </option>
                  </select>
                </label>
                <label
                  className="focus-within:ring h-14 rounded-md ring-onyx-200"
                  htmlFor="category"
                >
                  <select
                    className="w-fit bg-transparent px-2 py-4 outline-none"
                    name="category"
                    id="category"
                  >
                    <option className="text-black" value="All">
                      Job Category
                    </option>
                    <option className="text-black" value="All">
                      Category One
                    </option>
                    <option className="text-black" value="All">
                      Category Two
                    </option>
                  </select>
                </label>
                <input
                  id="search"
                  autoComplete="off"
                  placeholder="Type Something..."
                  type="search"
                  className="ml-1 h-14 w-full bg-transparent cursor-text rounded-md border py-4 pl-6 outline-none sm:border-0 sm:pr-40 sm:pl-12"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-md bg-flamingo-500 px-10 text-center align-middle text-base font-medium normal-case text-white outline-none ring-emerald-200 ring-offset-1 sm:absolute sm:right-0 sm:mt-0 sm:mr-1 sm:w-32 focus:ring"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
