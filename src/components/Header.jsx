import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

/**
 * Header Component
 * Responsive header with user authentication, navigation, language selection, and GPT search features
 */
const Header = () => {
  // Local state for UI controls
  const [showDropdown, setShowDropdown] = useState(false);        // Controls user profile dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Controls mobile menu visibility
  
  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state selectors
  const user = useSelector((store) => store.user);               // Current user information
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch); // GPT search view status

  /**
   * Handles user sign out
   * Dispatches removeUser action and cleans up UI state
   */
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        setShowDropdown(false);
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        navigate("/error");
        console.error(error);
      });
  };

  /**
   * Authentication state observer
   * Handles user session management and navigation
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  /**
   * Toggles GPT search view
   * Dispatches action to show/hide GPT search interface
   */
  const handleGptSearchClick = () => {

    dispatch(toggleGptSearchView());
    
  };

  /**
   * Handles language selection change
   * Dispatches action to update application language
   * @param {Event} e - Select element change event
   */
  const handleLanguageChange = (e) => { 
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  // Navigation links configuration
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'TV Shows', href: '#' },
    { name: 'Movies', href: '#' },
    { name: 'New & Popular', href: '#' }
  ];

  return (
    <div className="absolute w-full px-4 md:px-8 py-2 bg-gradient-to-b from-black z-10">
      <div className="flex flex-wrap items-center justify-between bg-black">
        {/* Logo Section */}
        <img className="w-24 md:w-44" src={LOGO} alt="logo" />

        {/* Mobile Menu Toggle Button */}
        {user && (
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Desktop Navigation Links */}
        {user && (
          <div className="hidden md:flex gap-4 flex-grow ml-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="text-white hover:text-
              gray-300">
                {link.name}
                </Link>
            ))}
          </div>
        )}

        {/* Desktop User Controls */}
        {user && (
          <div className="hidden md:flex items-center">
            {/* Language Selector - Only visible when GPT search is active */}
            {showGptSearch && (
              <div className="relative inline-block mr-4">
                <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
                <select 
                  className="appearance-none py-1 pl-8 pr-8 bg-transparent text-white border border-white rounded-md cursor-pointer hover:bg-opacity-20 hover:bg-white focus:outline-none focus:border-white text-sm"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option 
                      key={lang.identifier} 
                      value={lang.identifier}
                      className="bg-black text-white"
                    >
                      {lang.name}
                    </option>
                  ))}
                </select>
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none">
                  ▼
                </span>
              </div>
            )}
            
            {/* GPT Search Toggle Button */}
            <button
              className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-colors"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  className="w-10 h-10 rounded"
                  alt="user icon"
                  src={user?.photoURL}
                />
                <span className="text-white ml-2">▼</span>
              </div>

              {/* User Profile Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 top-12 w-48 bg-black bg-opacity-90 rounded-lg shadow-xl border border-gray-700">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-white font-medium">{user?.displayName}</p>
                    <p className="text-gray-400 text-sm truncate">{user?.email}</p>
                  </div>
                  <div
                    className="p-3 text-white hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {user && isMobileMenuOpen && (
          <div className="w-full md:hidden mt-4 bg-black bg-opacity-95 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Language Selector */}
              {showGptSearch && (
                <div className="relative">
                  <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
                  <select 
                    className="w-full appearance-none py-1 pl-8 pr-8 bg-transparent text-white border border-white rounded-md cursor-pointer hover:bg-opacity-20 hover:bg-white focus:outline-none focus:border-white text-sm"
                    onChange={handleLanguageChange}
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option 
                        key={lang.identifier} 
                        value={lang.identifier}
                        className="bg-black text-white"
                      >
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none">
                    ▼
                  </span>
                </div>
              )}
              
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              {/* Mobile GPT Search Button */}
              <button
                className="py-2 px-4 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-colors w-full"
                onClick={handleGptSearchClick}
              >
                {showGptSearch ? "Homepage" : "GPT Search"}
              </button>

              {/* Mobile User Profile Section */}
              <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                <div className="flex items-center">
                  <img
                    className="w-8 h-8 rounded"
                    alt="user icon"
                    src={user?.photoURL}
                  />
                  <div className="ml-2">
                    <p className="text-white text-sm">{user?.displayName}</p>
                    <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                  </div>
                </div>
                <button
                  className="text-white hover:text-gray-300 transition-colors"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background Overlay for Closing Dropdowns */}
      {(showDropdown || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => {
            setShowDropdown(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Header;