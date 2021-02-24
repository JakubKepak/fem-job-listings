import { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

// images
import backgroundHeaderImageDesktop from "./images/bg-header-desktop.svg";

// components
import ListingsItem from "./components/ListingsItem";

// custom hooks
import useSetFilteredData from "./hooks/useSetFilteredData";

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
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const FilterPanelContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  background-color: white;
  padding: 1rem;
  margin-top: -1.5rem;
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  display: flex;

  ${({ filterLength }) =>
    filterLength === 0 &&
    `
    display: none;
  `}
`;

const FilterItem = styled.div`
  margin-right: 1rem;
`;

const FilterItemName = styled.span`
  padding: 0.2rem 0.4rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.companyNameTextColor};
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 5px 0 0 5px;
`;

const DeleteFilterButton = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.4rem;
  background-color: ${({ theme }) => theme.companyNameTextColor};
  color: ${({ theme }) => theme.whiteColor};
  border-radius: 0 5px 5px 0;

  &:hover {
    background-color: ${({ theme }) => theme.positionNameTextColor};
    cursor: pointer;
  }
`;

const ClearButton = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.companyNameTextColor};
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ListingsContainer = styled.div`
  width: 80%;
  max-width: 1200px;
  margin-top: 2rem;
`;

function App() {
  const {
    filteredData,
    addFilter,
    removeFilter,
    clearAllFilters,
  } = useSetFilteredData();

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <MainContainer>
        <Header />
        <FilterPanelContainer filterLength={filteredData.filter.length}>
          {filteredData.filter.map((item) => {
            return (
              <FilterItem>
                <FilterItemName>{item}</FilterItemName>
                <DeleteFilterButton onClick={() => removeFilter(item)}>
                  x
                </DeleteFilterButton>{" "}
              </FilterItem>
            );
          })}
          <ClearButton onClick={clearAllFilters}>Clear</ClearButton>
        </FilterPanelContainer>
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
