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
const w = 1000;
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
    .attr("data-fips", (d) => {
      return d.id;
    })
    .attr("data-education", (d, i) => {
      const data = edu.filter((e) => {
        return e.fips === d.id;
      });
      return data[0].bachelorsOrHigher;
    })
    .attr("fill", (d, i) => {
      const data = edu.filter((e) => {
        return e.fips === d.id;
      });
      const color = data[0].bachelorsOrHigher;
      return (
        "rgb(" +
        (greenScale(color) - 70) +
        "," +
        greenScale(color) +
        "," +
        (greenScale(color) - 70) +
        ")"
      );
    })
    .on("mouseover", (evt, d) => {
      const data = edu.filter((e) => {
        return e.fips === d.id;
      });

      const education = data[0].bachelorsOrHigher;
      const state = data[0].state;
      const name = data[0].area_name;

      div
        .style("opacity", 0.9)
        .attr("data-education", education)
        .html(name + ", " + state + " : " + education + "%")
        .style("left", evt.pageX + 30 + "px")
        .style("top", evt.pageY + "px");
    })
    .on("mouseout", (evt, d) => {
      div.style("opacity", 0);
    });
  const legend = svg.append("g").attr("id", "legend");
  const leyendScale = d3.scaleLinear().domain([0, 60]).range([padding, 300]);
  const leyendAxis = d3
    .axisBottom(leyendScale)
    .ticks(6)
    .tickFormat((d) => {
      return d + "%";
    });
  legend
    .append("g")
    .attr("transform", "translate(0," + (h - 17) + " )")
    .call(leyendAxis);
  legend
    .append("rect")
    .attr("x", leyendScale(0))
    .attr("y", h - 37)
    .attr("width", 1 + 300 / 8)
    .attr("height", 20)
    .attr(
      "fill",
      "rgb(" +
        (greenScale(10) - 70) +
        "," +
        greenScale(10) +
        "," +
        (greenScale(10) - 70) +
        ")"
    );
  legend
    .append("rect")
    .attr("x", leyendScale(10))
    .attr("y", h - 37)
    .attr("width", 1 + 300 / 8)
    .attr("height", 20)
    .attr(
      "fill",
      "rgb(" +
        (greenScale(20) - 70) +
        "," +
        greenScale(20) +
        "," +
        (greenScale(20) - 70) +
        ")"
    );
  legend
    .append("rect")
    .attr("x", leyendScale(20))
    .attr("y", h - 37)
    .attr("width", 1 + 300 / 8)
    .attr("height", 20)
    .attr(
      "fill",
      "rgb(" +
        (greenScale(30) - 70) +
        "," +
        greenScale(30) +
        "," +
        (greenScale(30) - 70) +
        ")"
    );
  legend
    .append("rect")
    .attr("x", leyendScale(30))
    .attr("y", h - 37)
    .attr("width", 1 + 300 / 8)
    .attr("height", 20)
    .attr(
      "fill",
      "rgb(" +
        (greenScale(40) - 70) +
        "," +
        greenScale(40) +
        "," +
        (greenScale(40) - 70) +
        ")"
    );
  legend
    .append("rect")
    .attr("x", leyendScale(40))
    .attr("y", h - 37)
    .attr("width", 1 + 300 / 8)
    .attr("height", 20)
    .attr(
      "fill",
      "rgb(" +
        (greenScale(50) - 70) +
        "," +
        greenScale(50) +
        "," +
        (greenScale(50) - 70) +
        ")"
    );
  legend
    .append("rect")
    .attr("x", leyendScale(50))
    .attr("y", h - 37)
    .attr("width", 1 + 300 / 8)
    .attr("height", 20)
    .attr(
      "fill",
      "rgb(" +
        (greenScale(60) - 70) +
        "," +
        greenScale(60) +
        "," +
        (greenScale(60) - 70) +
        ")"
    );
  console.log(edu);
}
