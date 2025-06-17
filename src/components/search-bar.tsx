"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import AppButton from "./app-button";
import { Search } from "lucide-react";

type SearchBarProps = {
  handleSearch?: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex flex-row gap-2 w-full">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search Keyword"
      />
      <AppButton
        title="Search"
        icon={<Search />}
        buttonOptions={{
          onClick: handleSearch,
        }}
        iconPosition="start"
      />
    </div>
  );
};

export default SearchBar;
