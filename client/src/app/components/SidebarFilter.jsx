"use client";

import React from "react";

export default function FilterSidebar({ classTerms, typeTerms, onFilter }) {
  return (
    <div className="filter-sidebar p-3">
      <h5>Filter by Class</h5>
      <ul className="list-unstyled">
        {classTerms.map((term) => (
          <li key={term} className="mb-2">
            <button className="btn btn-link p-0 text-start" onClick={() => onFilter(term)}>
              • {term}
            </button>
          </li>
        ))}
      </ul>
      <h5 className="mt-4">Filter by Type</h5>
      <ul className="list-unstyled">
        {typeTerms.map((term) => (
          <li key={term} className="mb-2">
            <button className="btn btn-link p-0 text-start" onClick={() => onFilter(term)}>
              • {term}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
