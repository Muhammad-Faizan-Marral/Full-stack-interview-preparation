const { useEffect } = require("react");

function debounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
