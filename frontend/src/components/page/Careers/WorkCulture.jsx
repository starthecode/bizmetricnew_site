import React from 'react';
import { CultureSlider } from './CultureSlider';
import { Heading } from '../../Heading/Heading';
import BackgroundSection from '../../BackgroundSection';

export default function WorkCulture() {
  return (
    <BackgroundSection>
      <div className="container">
        <div className="grid grid-cols-2">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <Heading
                  type={''}
                  smallTitle={'#WeCare'}
                  title={'Our Work Fun Culture'}
                />

                <ul className="flex flex-col gap-4 mt-3">
                  <li className="text-2xl mb-2">
                    <h3 className="text-flamingo-500">Innovation</h3>
                    <p className="text-woodsmoke-200">
                      We drive innovative solutions, and that is why we regard
                      passionate candidates, who can bring positive changes with
                      their leading-edge capabilities.
                    </p>
                  </li>
                  <li className="text-2xl mb-2">
                    {' '}
                    <h3 className="text-flamingo-500">
                      Contribution Of Ideas, Strategy, &amp; Interest
                    </h3>
                    <p className="text-woodsmoke-200">
                      At Bizmetric, we give equal opportunity to all peers to
                      express their opinions, strategy, and ideas. We nurture
                      think-tanks, regardless of position or profile.
                    </p>
                  </li>
                  <li className="text-2xl mb-2">
                    {' '}
                    <h3 className="text-flamingo-500">Corporate Behavior</h3>
                    <p className="text-woodsmoke-200">
                      Maintaining professionalism is our standard. We pay
                      special attention to the corporate code of conduct and
                      ensure every individual abides by it. This helps maintain
                      the value of our organization.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <CultureSlider />
          </div>
        </div>
      </div>
    </BackgroundSection>
  );
}
