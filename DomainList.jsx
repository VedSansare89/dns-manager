import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming using React Router for navigation

const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("your-backend-api-url/domains"); // Replace URL
      setDomains(response.data);
    } catch (error) {
      console.error("Error fetching domains:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  return (
    <div>
      <h2>Available Domains</h2>
      {isLoading ? (
        <p>Loading domains...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {domains.map((domain) => (
            <li key={domain.name}>
              <Link to={`/domains/${domain.name}`}>{domain.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DomainList;
