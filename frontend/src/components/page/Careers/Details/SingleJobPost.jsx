import React from 'react';
import { PrimaryButton } from '../../../Buttons/PrimaryButton';
import { JobSidebar } from './JobSidebar';

export const SingleJobPost = () => {
  return (
    <section className="pb-20">
      {/* <HeroSection3 /> */}

      <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px] mt-20 container">
        <div className="lg:col-span-4 md:col-span-6">
          <JobSidebar />
        </div>

        <div className="lg:col-span-8 md:col-span-6">
          <h5 className="text-lg font-semibold">Job Description:</h5>
          <p className="text-slate-400 mt-4">
            One disadvantage of Lorum Ipsum is that in Latin certain letters
            appear more frequently than others - which creates a distinct visual
            impression. Moreover, in Latin only words at the beginning of
            sentences are capitalized.
          </p>
          <p className="text-slate-400 mt-4">
            This means that Lorem Ipsum cannot accurately represent, for
            example, German, in which all nouns are capitalized. Thus, Lorem
            Ipsum has only limited suitability as a visual filler for German
            texts. If the fill text is intended to illustrate the
            characteristics of different typefaces.
          </p>
          <p className="text-slate-400 mt-4">
            It sometimes makes sense to select texts containing the various
            letters and symbols specific to the output language.
          </p>

          <h5 className="text-lg font-semibold mt-6">
            Responsibilities and Duties:{' '}
          </h5>
          <p className="text-slate-400 mt-4">
            It sometimes makes sense to select texts containing the various
            letters and symbols specific to the output language.
          </p>
          <ul className="list-none">
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Participate in requirements analysis
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Write clean, scalable code using C# and .NET frameworks
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Test and deploy applications and systems
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Revise, update, refactor and debug code
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Improve existing software
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Develop documentation throughout the software development life
              cycle (SDLC)
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Serve as an expert on applications and provide technical support
            </li>
          </ul>

          <h5 className="text-lg font-semibold mt-6">
            Required Experience, Skills and Qualifications:{' '}
          </h5>
          <p className="text-slate-400 mt-4">
            It sometimes makes sense to select texts containing the various
            letters and symbols specific to the output language.
          </p>
          <ul className="list-none">
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Proven experience as a .NET Developer or Application Developer
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              good understanding of SQL and Relational Databases, specifically
              Microsoft SQL Server.
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Experience designing, developing and creating RESTful web services
              and APIs
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Basic know how of Agile process and practices
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Good understanding of object-oriented programming.
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Good understanding of concurrent programming.
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Sound knowledge of application architecture and design.
            </li>
            <li className="text-slate-400 mt-2">
              <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
              Excellent problem solving and analytical skills
            </li>
          </ul>

          <div className="mt-5 w-[10rem]">
            <PrimaryButton title="Apply Now" link="" />
          </div>
        </div>
      </div>
    </section>
  );
};
