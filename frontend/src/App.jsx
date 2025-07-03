import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/auth/signup';
import Signin from './pages/auth/signin';
import { Toaster } from 'react-hot-toast';

import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard/Dashboard';
import { Post } from './pages/Dashboard/Post';
import DashboardLayout from './components/DashComponents/DashboardLayout';
import PermissionPrivateRoute from './components/PermissionPrivateRoute';
import { Page } from './pages/Dashboard/Page';
import { Pages } from './pages/Dashboard/Pages';
import General from './pages/Dashboard/Settings/General';
import { Posts } from './pages/Dashboard/Posts';
import { Inquires } from './pages/Dashboard/Inquires';

import Blogs from './pages/Blogs';
import ForntLayout from './components/Layouts/ForntLayout';
import BlogSingle from './components/BlogSingle';
import Services from './pages/Services';
import Industries from './pages/Industries';
import NotFound from './NotFound';
import { PostSolutions } from './pages/Dashboard/Custom/PostSolutions';
import { Solutions } from './pages/Dashboard/Solutions';
import SolutionsPage from './pages/SolutionsPage';
import SuccessStories from './pages/SuccessStories';
import Careers from './pages/Careers';
import { SingleJobPost } from './components/page/Careers/Details/SingleJobPost';
import SharedPage from './pages/SharedPage';
import ScrollToTop from './components/ScrollToTop';
import { PostNewsletters } from './pages/Dashboard/Custom/PostNewsletters';
import { Newsletters } from './pages/Dashboard/Newsletters';
import SingleNewsletter from './components/page/Newsletters/SingleNewsletter';
import { PostCaseStudy } from './pages/Dashboard/Custom/PostCaseStudy';
import SingleCaseStudy from './components/page/CaseStudy/SingleCaseStudy';
import { CaseStudies } from './pages/Dashboard/CaseStudies';
import PostCustomizer from './pages/Dashboard/Appearance/Customizer/PostCustomizer';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <main className="transition-colors duration-500 dark:dark-gradiant relative w-full h-auto overflow-hidden">
          <Routes>
            <Route element={<ForntLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogSingle />} />
              <Route path="/services/:slug" element={<Services />} />
              <Route path="/industries/:slug" element={<Industries />} />
              <Route path="/solutions/:slug" element={<SolutionsPage />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route
                path="/success-stories/:slug"
                element={<SingleCaseStudy />}
              />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:slug" element={<SingleJobPost />} />
              <Route path="/newsletters/:slug" element={<SingleNewsletter />} />

              <Route path="/:slug" element={<SharedPage />} />

              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route element={<PermissionPrivateRoute />}>
                  <Route path="/dashboard/post-new" element={<Post />} />
                  <Route path="/dashboard/page-new" element={<Page />} />
                  <Route path="/dashboard/pages" element={<Pages />} />
                  <Route path="/dashboard/posts" element={<Posts />} />
                  <Route path="/dashboard/inquires" element={<Inquires />} />

                  <Route
                    path="/dashboard/new-solution"
                    element={<PostSolutions />}
                  />
                  <Route path="/dashboard/solutions" element={<Solutions />} />
                  <Route
                    path="/dashboard/new-newsletter"
                    element={<PostNewsletters />}
                  />
                  <Route
                    path="/dashboard/newsletters"
                    element={<Newsletters />}
                  />
                  <Route
                    path="/dashboard/new-casestudy"
                    element={<PostCaseStudy />}
                  />
                  <Route
                    path="/dashboard/casestudies"
                    element={<CaseStudies />}
                  />
                  <Route
                    path="/dashboard/settings/general"
                    element={<General />}
                  />
                  <Route
                    path="/dashboard/customizer/:slug"
                    element={<PostCustomizer />}
                  />

                  {/* Add more dashboard routes here */}
                </Route>
              </Route>
            </Route>
          </Routes>
          <Toaster position="top-center" />
        </main>
      </ScrollToTop>
    </BrowserRouter>
  );
}
