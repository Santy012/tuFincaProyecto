import AllTagsSection from "./components/AllTagsSection";
import Header from "./components/Header";
import PropertyGrid from "./components/PropertyGrid";
import Footer from "./components/Footer";
const MainPage = () => {
    return(
        <main>
            <Header/>
            <AllTagsSection/>
            <PropertyGrid/>
            <Footer/>
        </main>
    )
}

export default MainPage;