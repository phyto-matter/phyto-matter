import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";

export function FrontPageView() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)",
  );

  let marginDeviceSize =
    isSmallDevice || isMediumDevice
      ? { ml: 10, mr: 10, mt: 5 }
      : { ml: 40, mr: 40, mt: 5 };

  return (
    <>
      <Container sx={{ pt: 40, height: "100vh" }}>
        <Typography sx={marginDeviceSize}>
          Are you interested in remediating soils with plants (phyto) and making
          local plant-based materials (matter) on your site? Phyto-matter is an
          open-source platform that connects research and practice to improve
          current landscape development made by landscape architecture master
          students Nina Safavi and Johanna Larsson from Swedish University of
          Agricultural Sciences at Alnarp, Sweden.
        </Typography>
      </Container>
      <Box sx={{ pt: 30, height: "100vh" }}>
        <iframe
          width="100%"
          height={isSmallDevice ? "50%" : "100%"}
          src="https://www.youtube.com/embed/TVF67QVVcT0?si=-ACUhMKJAmzlVObZ"
          title="PhytoMatter"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Box>
      <Container sx={{ pt: 30, minHeight: "100vh" }}>
        <Typography sx={marginDeviceSize}>
          This tool aims to help take meaningful action in current soil cleaning
          and materials making practice in urban development, according to
          circular and regenerative design principles. This tool is intended to
          be a live platform where researchers, planners, architects and others
          can share knowledge to develop and make better circular design
          decisions on site. We expect research to evolve and uncover more and
          more valuable insights over time. As Phyto-matter provides answers to
          some of the current challenges, many (or more?) questions also arise.
          <a
            href="https://github.com/phyto-matter/phyto-matter?tab=readme-ov-file#phyto-matter"
            target="_blank"
            rel="noreferrer"
          >
            We encourage participants and users of this tool to contact us with
            any feedback or ideas on how to develop newer versions in the
            future.
          </a>
        </Typography>
        <Typography sx={marginDeviceSize}>
          All references and example projects/materials are based on their own
          local conditions, as they must and should be. None of the information
          found here can be directly translated into another site, but local
          conditions must always be considered and adaptations accordingly must
          be made.
        </Typography>
      </Container>
      <Container sx={{ pt: 30, minHeight: "100vh" }}>
        <img
          style={{
            height: "auto",
            maxWidth: "100%",
            margin: "0 auto",
            display: "block",
          }}
          src="/phytoremediation.jpeg"
          loading="lazy"
          alt="phytoremediation"
        />
      </Container>
      <Container sx={{ pt: 30, minHeight: "100vh" }}>
        <Typography sx={marginDeviceSize}>
          Press PLANTS to see what plants are suitable for cleaning what
          contaminants - how they do it (phyto processes) together with the more
          regular horticultural qualities of plants relevant in design.
        </Typography>
        <Typography sx={marginDeviceSize}>
          Under CONTAMINANTS you can find more information on contaminants
          present in soils, basic information about them and related plants that
          will help cleaning up the soil.
        </Typography>
      </Container>
      <Container sx={{ pt: 30, minHeight: "100vh" }}>
        <img
          style={{
            height: "auto",
            maxWidth: "100%",
            margin: "0 auto",
            display: "block",
          }}
          src="/process-diagram.png"
          loading="lazy"
          alt="phytoremediation"
        />
      </Container>
      <Container sx={{ pt: 30, minHeight: "100vh" }}>
        <Typography sx={marginDeviceSize}>
          MATERIALS is a growing collection of plant based projects and
          practices, a reference library to help you find inspiration and the
          accurate understanding of how to make plant based materials on your
          site.
        </Typography>
        <Typography sx={marginDeviceSize}>
          The CALCULATOR helps you estimate a timeline for phytoremediation of
          your site based on your plant selection together with suggestions for
          plant based materials to make, targeting your selected contaminants.
        </Typography>
        <Typography sx={marginDeviceSize}>
          Do you want to contribute? We welcome researchers and designers adding
          information to the open source knowledge pool using the very
          user-friendly upload system GitHub Pull Requests.
        </Typography>
        <Typography sx={marginDeviceSize}>
          <a
            href="https://github.com/phyto-matter/phyto-matter?tab=readme-ov-file#phyto-matter"
            target="_blank"
            rel="noreferrer"
          >
            Click here to find out how!
          </a>
        </Typography>
        <Typography sx={marginDeviceSize}>
          We have contacted the researchers, practices and initiatives featured
          in the tool to request permission to reproduce or link to their work.
          If we have missed any, please do get in touch so that we can resolve
          this in future versions of this application.
        </Typography>
      </Container>
      <Container sx={{ pt: 30, minHeight: "100vh" }}>
        <Typography sx={marginDeviceSize} variant="h5">
          Disclaimer!
        </Typography>
        <Typography sx={marginDeviceSize}>
          The authors of this site assume no responsibility or liability for any
          errors or omissions in the content of this site. The information
          contained in this site is provided on an &quot;as is&quot; basis with
          no guarantees of completeness, accuracy, usefulness or timeliness and
          without any warranties of any kind whatsoever, express or implied.
          While we have taken every precaution to ensure that the content of
          this site is both current and accurate, errors can occur.
        </Typography>
        <Typography sx={marginDeviceSize}>
          This platform is intended to function as a starting point only, plants
          based systems for remediation should not be applied without the help
          and experience of a professional in this field.
        </Typography>
        <Typography sx={marginDeviceSize}>
          Local site and soil conditions, hydrology and other aspects will
          greatly influence the outcome of a project, getting to know your local
          site conditions is the most important part of any circular project.
        </Typography>
        <Typography sx={marginDeviceSize}>Good luck!</Typography>
      </Container>
      <Container sx={{ pt: 30, minHeight: "100vh" }}>
        <Typography sx={marginDeviceSize} variant="h5">
          Acknowledgements
        </Typography>
        <Typography sx={marginDeviceSize}>
          The authors would like to thank all of the professionals, volunteers
          and participants who has been involved in the Phyto-matter project so
          far. The work was funded by SLU Holding and Sparbanken Skåne (partly
          through the Innovation Award 2023) which resulted in the short film by
          Filmbruket, this website and the{" "}
          <a
            href="https://github.com/phyto-matter/phyto-matter?tab=readme-ov-file#phyto-matter"
            target="_blank"
            rel="noreferrer"
          >
            open source GitHub platform.
          </a>{" "}
          Thank you to those who contributed with their time and knowledge on
          the topics of phytoremediation and materials making. All of your
          insights have contributed in different ways. Thank you developer
          geniuses Hugo Bove and Nora Disewji, without you there would be no
          user interface and no one outside of the university would understand
          anything about this project.
        </Typography>
        <Typography sx={marginDeviceSize}>
          Especially thankful are we to our data contributors, researchers and
          experimental individuals who continue providing data and insights to
          this tool.
        </Typography>
      </Container>
      <Container sx={{ pt: 40, minHeight: "100vh" }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <img
              style={{ height: 70 }}
              src="/filmbruket.png"
              alt="Filmbruket"
              loading="lazy"
            />
          </Grid>
          <Grid item>
            <img
              style={{ height: 90 }}
              src="/slu.png"
              alt="SLU"
              loading="lazy"
            />
          </Grid>
          <Grid item>
            <img
              style={{ height: 50 }}
              src="/sparbank.png"
              alt="Sparbanksstiftelsen Skåne"
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
