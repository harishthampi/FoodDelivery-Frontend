import { useSearchRestaurants } from "@/api/restaurantsListApi";
import CuisineFilter from "@/components/cuisineFilter";
import PaginationSelectorComponent from "@/components/PaginationSelectorComponent";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultsCards from "@/components/searchResultsCards";
import SearchResultsInfo from "@/components/searchResultsInfo";
import SortOptionDropDown from "@/components/sortOptionDropDown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "Best Match",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) =>({
      ...prevState,
      sortOption,
      page: 1,
    }))
  }

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    <span>Loading...</span>;
  }
  if (!results?.data || !city) {
    return <span>No results Found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClicked={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          onSubmit={setSearchQuery}
          placeholder="Search by cuisines or restaurant name"
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
        <SearchResultsInfo city={city} total={results.pagination.total} />
        <SortOptionDropDown sortOptions={searchState.sortOption} onChange={(value) => setSortOption(value)} />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultsCards restaurant={restaurant} />
        ))}
        <PaginationSelectorComponent
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
