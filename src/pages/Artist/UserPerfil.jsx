import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import Navbar from "../../components/Home/Navbar";
import FollowButton from "../../components/Utilities/FollowButton";

export default function UserPerfil() {
  return (
    <div className="w-full h-full max-w-full-xl mt-2 bg-blackMain">
      <Header />

      <div className="flex">
        <Navbar />

        <div className="flex-1 p-8">
          {/* Banner Section */}
          <div className="w-full h-64 bg-gray-900 flex items-center justify-center mb-8">
            <span className="text-white text-2xl">Banner Placeholder</span>
          </div>

          <div className="bg-gray-700 p-6 rounded mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gray-500 rounded-full h-12 w-12 mr-4"></div>
                <FollowButton />
              </div>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div className="mb-4">
              <textarea
                className="w-1/2 h-32 bg-gray-600 text-white p-2 rounded mt-2"
                placeholder="Escriba su biografía aquí..."
              ></textarea>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div className="mb-4">
              <span>Artistas con los que trabajó:</span>
              <div className="flex space-x-2">
                <div className="bg-gray-500 h-12 w-12"></div>
                <div className="bg-gray-500 h-12 w-12"></div>
                <div className="bg-gray-500 h-12 w-12"></div>
                <div className="bg-gray-500 h-12 w-12"></div>
              </div>
            </div>

            <div className="border-b border-gray-500 my-4"></div>

            <div className="mb-4">
              <span>Redes Sociales:</span>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
