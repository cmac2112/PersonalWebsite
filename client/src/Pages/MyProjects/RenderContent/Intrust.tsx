import Emphasis from "../../../Components/Emphasis/Emphasis"
import "../../../Components/ProgressionMeter/PogressionMeter.css"
const Intrust = () => {
  return (
    <div>
      <h2>
        Developer and Maintainer of over 30+ internal applications on a
        Blazor/.Net/SQL server stack.{" "}
      </h2>
      <h2><Emphasis>Applications</Emphasis></h2>
      <p>
        <Emphasis>Sole developer</Emphasis> of a wealth management application
        used by the entire Wealth department (50+ users), replacing legacy
        spreadsheet workflows and supporting account documentation and approvals
        for <Emphasis> portfolios exceeding $9B in client assets. </Emphasis>{" "}
        Implemented role-based access, administrative controls, QA rejection
        workflows, and automated email notifications, significantly reducing
        operational errors and improving data integrity.
      </p>
      
      <p>
        <Emphasis>Sole developer</Emphasis> of an internal incident tracking
        application used by 100+ users across Physical Security, IT Operations,
        and Data Services & Development. Replaced a legacy Access database with
        a role-segregated system featuring department-isolated data,
        SharePoint-backed file attachments, and analytics dashboards (incident
        categorization, time-series trends, and executive exports) to support
        operational reporting and incident management.
      </p>
      <p>
        <Emphasis>Sole developer</Emphasis> of a production asset escheatment
        application used by the Deposit Quality Assurance team to manage real
        customer accounts. Replaced manual workflows with a role-controlled,
        audit-logged system processing thousands of accounts, implementing
        state-specific escheatment rules and conditional automation that removed
        accounts when qualifying activity resumed—reducing compliance risk and
        accelerating review throughput by an estimated 10×.
      </p>
      <p>
        Co-developer of a production Treasury Services platform used by{" "}
        <Emphasis>
          all business banking customers to configure and enforce critical
          account services
        </Emphasis>
        , including real-time ACH limits, wire permissions, Positive Pay,
        balance reporting, and approval workflows. Owned full-stack development
        on a three-person team, enhancing an existing system with role-based
        controls, audit logging, and exportable reports to improve regulatory
        compliance and reduce operational errors.
      </p>
      <h2><Emphasis>Internal Libraries and APIs</Emphasis></h2>
      <p>
        <Emphasis>Maintainer and core contributor to a mission-critical internal NuGet
        library powering 30+ modern Blazor applications within a regulated
        banking environment.</Emphasis> Defined and documented shared component standards,
        abstract base classes, and interfaces spanning UI components,
        authentication, and API business logic, ensuring consistent behavior
        across all internal applications. Owned versioning, releases, and PR
        reviews, while onboarding developers and accelerating delivery to the
        point where new applications can be assembled in a single day with
        minimal custom HTML or duplicated logic.
      </p>
      <p>
        Served as <Emphasis>primary architect for an EF Core–based middleware microservice </Emphasis>
        enabling secure cross-application database access across internal
        banking applications. Implemented a reusable NuGet-distributed shared
        context abstraction allowing applications to read and write across
        service-owned schemas without stored procedures, significantly
        modernizing legacy data access patterns. Integrated authentication and
        enforced database-level permissions in coordination with a
        mission-critical internal component library to maintain security in a
        regulated financial environment.
      </p>
      <h2><Emphasis>Github Actions - CI/CD</Emphasis></h2>
      <p>
        Built and maintained CI pipelines using GitHub Actions to automate
        build, test, package, and publish workflows for internal NuGet
        libraries. Enforced pull request validation through automated test
        execution, improving reliability and preventing regressions in shared,
        mission-critical components.
      </p>
      <p>Maintained many more applications that may appear here later</p>
    </div>
  );
};

export default Intrust;
