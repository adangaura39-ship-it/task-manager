import { CATEGORIES, STATUS_FILTERS } from "../constants";

function FilterBar({ status, category, onStatusChange, onCategoryChange }) {
  return (
    <div className="filter-bar">
      <div className="status-filters">
        {STATUS_FILTERS.map((name) => (
          <button
            key={name}
            type="button"
            className={`btn btn-ghost ${status === name ? "active" : ""}`}
            onClick={() => onStatusChange(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
