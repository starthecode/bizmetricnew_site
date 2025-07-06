import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  let navigate = useNavigate();

  return (
    <>
      <button
        className="bg-flamingo-500/10 px-4 py-1 flex items-center text-flamingo-500"
        onClick={() => navigate(-1)}
      >
        <BiArrowBack size={20} /> Back
      </button>
    </>
  );
}
