import { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

// images
import backgroundHeaderImageDesktop from "./images/bg-header-desktop.svg";

// components
import ListingsItem from "./components/ListingsItem";

// custom hooks
import useSetFilteredData from "./hooks/useSetFilteredData";

// misc
import { mockData } from "./mock/data";

// themes
const defaultTheme = {
  backgroundColor: "hsl(180, 52%, 96%)",
  companyNameTextColor: "hsl(180, 29%, 50%)",
  positionNameTextColor: "hsl(180, 14%, 20%)",
  newIconBackground: "hsl(180, 29%, 50%)",
  featuredBackground: "hsl(180, 14%, 20%)",
  whiteColor: "white",
  lightGrey: "hsl(180, 8%, 52%)",
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    display: flex;
    justify-content: center;
    height: 100vh;
    font-family: 'Spartan', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const MainContainer = styled.div`
  width: 100vw;
  /* max-width: 1440px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Header = styled.div`
  width: 100%;
  height: 8rem;
  background-image: url(${backgroundHeaderImageDesktop});
  background-color: hsl(180, 29%, 50%);
`;

const ListingsContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  margin-top: 2rem;
`;

function App() {
  const { filteredData, addFilter } = useSetFilteredData();

  // const [data, setData] = useState([]);
  // const [filters, setFilters] = useState(["HTML"]);

  // useEffect(() => {
  //   if (filters.length !== 0) {
  //     let filteredData = [];

  //     mockData.map((item) => {
  //       if (
  //         [...item.languages, ...item.tools].some(
  //           (item) => filters.indexOf(item) !== -1
  //         )
  //       ) {
  //         filteredData.push(item);
  //       }
  //     });
  //     setData(filteredData);
  //   } else {
  //     setData(mockData);
  //   }
  // }, [mockData, filters]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <MainContainer>
        <Header></Header>
        <ListingsContainer>
          {filteredData.data.map((item) => {
            return (
              <ListingsItem
                key={item.id}
                company={item.company}
                logo={require("" + item.logo)}
                position={item.position}
                featured={item.featured}
                newItem={item.new}
                postedAt={item.postedAt}
                contract={item.contract}
                location={item.location}
                languages={item.languages}
                tools={item.tools}
                addFilter={addFilter}
              />
            );
          })}
        </ListingsContainer>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
