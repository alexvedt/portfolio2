import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import reactsvg from "../../assets/react.svg";
import samplesnatch from "../../assets/samplesnatch.png";
import venues from "../../assets/venues.png";
import markedz from "../../assets/markedz.png";

const sampleImage = reactsvg;
const samplesnatchimg = samplesnatch;
const venuesimg = venues;
const markedzimg = markedz;
const Example = () => {
  return (
    <>
      <div className="flex h-48 flex-col items-center justify-center bg-slate-900">
        <span className="font-semibold uppercase text-white">Scroll down</span>
        <span className="mt-2 block rounded-full bg-indigo-600 px-4 py-1 text-center font-medium text-white md:hidden">
          Note: This is much cooler on desktop 😊
        </span>
      </div>
      <SwapColumnFeatures />
      <div className="flex h-48 items-center justify-center bg-indigo-600">
        <span className="font-semibold uppercase text-white">Scroll up</span>
      </div>
    </>
  );
};

const SwapColumnFeatures = () => {
  const [featureInView, setFeatureInView] = useState(projects[0]);

  return (
    <section className="relative mx-auto max-w-7xl">
      <SlidingFeatureDisplay featureInView={featureInView} />

      {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
      <div className="-mt-[100vh] hidden md:block" />

      {projects.map((s) => (
        <Content
          key={s.id}
          featureInView={s}
          setFeatureInView={setFeatureInView}
          {...s}
        />
      ))}
    </section>
  );
};

const SlidingFeatureDisplay = ({ featureInView }) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-3/5 rounded-xl p-8"
      >
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

SlidingFeatureDisplay.propTypes = {
  featureInView: PropTypes.shape({
    contentPosition: PropTypes.string.isRequired,
  }).isRequired,
};

const Content = ({ setFeatureInView, featureInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView, featureInView, setFeatureInView]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <span className="rounded-full bg-indigo-600 px-2 py-1.5 text-xs font-medium text-white">
            {featureInView.callout}
          </span>
          <p className="my-3 text-5xl font-bold">{featureInView.title}</p>
          <p className="text-slate-600">{featureInView.description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <ExampleFeature featureInView={featureInView} />
        </motion.div>
      </div>
    </section>
  );
};

Content.propTypes = {
  setFeatureInView: PropTypes.func.isRequired,
  featureInView: PropTypes.shape({
    callout: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    contentPosition: PropTypes.string.isRequired,
  }).isRequired,
};

const ExampleFeature = ({ featureInView }) => {
  return (
    <div className="relative h-96 w-full rounded-xl bg-slate-800 shadow-xl">
      <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="p-2">
        <img
          src={featureInView.image}
          alt={featureInView.title}
          className="w-full h-72 object-cover rounded-lg mb-4"
        />
        <div className="flex space-x-4">
          <a
            href={featureInView.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-indigo-500 hover:text-indigo-400"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
          <a
            href={featureInView.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-indigo-500 hover:text-indigo-400"
          >
            <FaExternalLinkAlt className="mr-2" /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

ExampleFeature.propTypes = {
  featureInView: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    githubUrl: PropTypes.string.isRequired,
    liveDemoUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Example;

const projects = [
  {
    id: 1,
    callout: "Music Production",
    title: "Samplesnatch",
    description:
      "Built for music producers on a Spotify API to browse and find samples.",
    contentPosition: "r",
    image: samplesnatchimg,
    githubUrl: "https://github.com/yourusername/samplesnatch",
    liveDemoUrl: "https://samplesnatch.xyz/",
  },
  {
    id: 2,
    callout: "Project Exam 2",
    title: "Zvenue",
    description: "Built with Noroff API, React JS, Tailwind.",
    contentPosition: "l",
    image: venuesimg,
    githubUrl: "https://github.com/yourusername/zvenue",
    liveDemoUrl: "https://zvenue.com",
  },
  {
    id: 3,
    callout: "Project Exam 1",
    title: "Markedz",
    description: "Built with Noroff API, React JS, Tailwind.",
    contentPosition: "r",
    image: markedzimg,
    githubUrl: "https://github.com/yourusername/markedz",
    liveDemoUrl: "https://markedz.netlify.app/",
  },
  {
    id: 4,
    callout: "Project Exam 2",
    title: "Zvenue",
    description: "Built with Noroff API, React JS, Tailwind.",
    contentPosition: "l",
    image: sampleImage, // Replace with actual image path
    githubUrl: "https://github.com/yourusername/zvenue",
    liveDemoUrl: "https://zvenue.com",
  },
];
