# Front End Filter Optimization

## 🔍 Overview

This project is a frontend-driven business intelligence dashboard that mimics Amazon-style dynamic filtering. It allows users to filter a dataset by multiple criteria, with each filter updating intelligently based on selections made in other filters. The UI includes a paginated and scrollable table, interactive dropdowns, and efficient filtering logic.

---

## 🚀 Features

- 🔢 **Modulo-based Filtering**: Dataset columns represent modulo values (e.g., `mod3`, `mod4`, `mod5`, etc.)
- 🔄 **Dynamic Filter Updates**: Selecting a value in one filter updates all others based on filtered data overlap
- 📑 **Paginated Table**: Displays 100 rows per page with only 20 visible at a time via scroll
- 🔍 **Multi-Select Dropdowns**: Each filter supports searchable, multi-select dropdowns
- ⚡ **High Performance**: Designed to handle large datasets efficiently with real-time updates
- 🧪 **Unit Tested**: Core functionality tested with [Jest](https://jestjs.io/)

---

## 🖥️ Demo

Live URL: [Live-Link](https://data-filter-project-loop.vercel.app/)  
GitHub Repo: [Sansh72-Data-Filter-Project-Loop](https://github.com/sansh72/Data-Filter-Project-Loop)

---

## 🧠 How It Works

- Filters are generated from unique values of each column.
- When a filter is applied, the data is filtered first, and the remaining filters are updated to reflect only applicable values.
- This avoids the problem of selecting filters that lead to an empty dataset.

Example:
> Selecting `mod3 = 2` will automatically update `mod6` filter to only show values that overlap with those rows (e.g., only values like 1 or 3).


