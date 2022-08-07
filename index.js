d3.select("div")
  .append("h1")
  .attr("id", "title")
  .text("United States Educational Attainment");
d3.select("div")
  .append("h3")
  .attr("id", "description")
  .text(
    "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
  );
const w = 1500;
const h = 700;
const padding = 70;
const svg = d3.select("div").append("svg").attr("width", w).attr("height", h);
const div = d3
  .select("div")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);
proceede();

async function getEdu() {
  return fetch(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
  )
    .then((response) => response.json())
    .then((d) => {
      return d;
    });
}
async function getCounties() {
  return fetch(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
  )
    .then((response) => response.json())
    .then((d) => {
      return d;
    });
}
async function proceede() {
  const edu = await getEdu();
  const counties = await getCounties();
  const path = d3.geoPath();

  const greenScale = d3
    .scaleLinear()
    .domain([
      d3.min(edu, (d) => {
        return d.bachelorsOrHigher;
      }),
      d3.max(edu, (d) => {
        return d.bachelorsOrHigher;
      }),
    ])
    .range([255, 0]);

  svg
    .append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(counties, counties.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("d", path)
    .attr("data-fips", (d, i) => {
      return edu[i].fips;
    })
    .attr("data-education", (d, i) => {
      return edu[i].bachelorsOrHigher;
    })
    .attr("fill", (d, i) => {
      return (
        "rgb(" +
        (greenScale(edu[i].bachelorsOrHigher) - 70) +
        "," +
        greenScale(edu[i].bachelorsOrHigher) +
        "," +
        (greenScale(edu[i].bachelorsOrHigher) - 70) +
        ")"
      );
    });

  console.log(edu);
}
