
import ContentLoader from "react-content-loader"
export const CarCardPlaceholder = () => (
  <ContentLoader 
    height={300}
    width={300}
    speed={1}
    rtl
    primaryColor="#d2d2d2"
    secondaryColor="#ecebeb"
    style={{width: '300px', height: '300px', margin: '10px auto'}}
    className="carcard"
  >
    <rect x="10" y="10" rx="3" ry="3" width="263" height="179" /> 
    <rect x="20" y="230" rx="3" ry="3" width="70" height="10" /> 
    <rect x="100" y="230" rx="3" ry="3" width="100" height="10" /> 
    <rect x="210" y="230" rx="3" ry="3" width="10" height="10" /> 
    <rect x="35" y="250" rx="3" ry="3" width="130" height="10" /> 
    <rect x="175" y="250" rx="3" ry="3" width="80" height="10" /> 
    <rect x="35" y="270" rx="3" ry="3" width="90" height="10" /> 
    <rect x="135" y="270" rx="3" ry="3" width="60" height="10" /> 
    <rect x="205" y="270" rx="3" ry="3" width="60" height="10" /> 
    <rect x="20" y="290" rx="3" ry="3" width="30" height="10" /> 
    <rect x="20" y="200" rx="3" ry="3" width="208" height="20" />
  </ContentLoader>
)