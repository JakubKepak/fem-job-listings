import styled from "styled-components";

const ListingItemContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  display: flex;

  ${({ featured }) =>
    featured &&
    `
    border-left: 4px solid hsl(180, 29%, 50%);
  `}

  @media (max-width: 780px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;

const CompanyLogo = styled.img`
  width: 4rem;
  height: 4rem;

  @media (max-width: 780px) {
    width: 3rem;
    height: 3rem;
    margin-top: -3rem;
    margin-bottom: 0.5rem;
  }
`;

const DescriptionContainer = styled.div`
  margin-left: 1rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 0.5rem;
`;

const CompanyNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyName = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.companyNameTextColor};
  margin-right: 1rem;
`;

const NewIcon = styled.span`
  background-color: ${({ theme }) => theme.newIconBackground};
  text-transform: uppercase;
  display: none;
  color: ${({ theme }) => theme.whiteColor};
  padding: 0.2rem 0.4rem 0.1rem 0.4rem;
  border-radius: 20px;
  margin-right: 0.4rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;

  ${({ newItem }) =>
    newItem &&
    `
    display: block;
  `}
`;

const FeaturedIcon = styled.span`
  background-color: ${({ theme }) => theme.featuredBackground};
  text-transform: uppercase;
  color: ${({ theme }) => theme.whiteColor};
  display: none;
  padding: 0.2rem 0.4rem 0.1rem 0.4rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-align: center;

  ${({ featured }) =>
    featured &&
    `
    display: block;
  `}
`;

const PositionName = styled.span`
  color: ${({ theme }) => theme.positionNameTextColor};
  font-weight: 700;
`;

const SpecificationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Specification = styled.span`
  color: ${({ theme }) => theme.lightGrey};
  font-size: 0.8rem;
`;

const Dot = styled.span`
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.lightGrey};
  margin: 0 1rem;
`;

const ToolsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

  @media (max-width: 780px) {
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.lightGrey};
  }
`;

const ToolBox = styled.span`
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.backgroundColor};
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.companyNameTextColor};
  font-weight: 700;
  font-size: 0.7rem;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.companyNameTextColor};
    color: ${({ theme }) => theme.whiteColor};
  }
`;

export default function ListingsItem({
  company,
  logo,
  featured,
  newItem,
  position,
  postedAt,
  contract,
  location,
  languages,
  tools,
  addFilter,
}) {
  return (
    <ListingItemContainer featured={featured}>
      <CompanyLogo src={logo.default} alt={company}></CompanyLogo>
      <DescriptionContainer>
        <CompanyNameContainer>
          <CompanyName>{company}</CompanyName>
          <NewIcon newItem={newItem}>New!</NewIcon>
          <FeaturedIcon featured={featured}>featured</FeaturedIcon>
        </CompanyNameContainer>
        <PositionName>{position}</PositionName>
        <SpecificationContainer>
          <Specification>{postedAt}</Specification>
          <Dot />
          <Specification>{contract}</Specification>
          <Dot />
          <Specification>{location}</Specification>
        </SpecificationContainer>
      </DescriptionContainer>
      <ToolsContainer>
        {[...languages, ...tools].map((tool) => {
          return (
            <ToolBox
              key={Math.round(Math.random() * 10000000000000)}
              onClick={() => addFilter(tool)}
            >
              {tool}
            </ToolBox>
          );
        })}
      </ToolsContainer>
    </ListingItemContainer>
  );
}
