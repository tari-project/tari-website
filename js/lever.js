/**
  Returns a Promise for lever job listings, grouped by team
**/
var get_teams_json = function() {
  return fetch('https://api.lever.co/v0/postings/tari?mode=json').then(res => {
      if (res.status === 200) {
          return res.json();
      } else {
          return Promise.reject();
      }
  }).then(raw_jobs => {
      const teams = {};
      for (let i in raw_jobs) {
          const job = raw_jobs[i];
            const team = job.categories.team;
            if (!teams[team]) {
                teams[team] = [];
            }
            const team_group = teams[team];
            team_group.push(job);
      }
      return teams;
  });
};

/**
  Fetch the Lever job listings and add them as html to the element
  provided
**/
var get_jobs_as_html = function(el) {
    const STATIC_LINK = `<section id="call-to-action"><div class="block"><a class="btn" target="_blank" href="https://jobs.lever.co/tari">View our current openings</a></div></section>`;
    const NO_POSITIONS = `<section id="call-to-action"><div class="block"><h2>There are no positions currently available.</h2></div></section>`;
    console.log('Fetching listings');
    get_teams_json().then(teams => {
        const div = [];
        for (let i in teams) {
            const team_div = format_team(i, teams[i]);
            div.push(team_div);
        }
        if (div.length === 0) {
            el.innerHTML = NO_POSITIONS;
        } else {
            el.innerHTML = div.join('\n');
        }
    }).catch(() => {
        el.innerHTML = STATIC_LINK;
    });
};

function format_team(team, jobs) {
    const div = [];
    div.push(`<div class="row"><div class="job-team col-sm-4"><h3>${team}</h3></div><div class="col-sm-8">`);
    for (let i in jobs) {
        div.push(format_job(jobs[i]));
    }
    div.push('</div></div>');
    return div.join('\n');
}

function format_job(job) {
  return `<div class="job-posting">
    <div class="title">
      <h4><a target="_blank" href="${job.hostedUrl}">${job.text}</a></h4>
      <p>${job.categories.location}</p>
    </div>
    <div class="details">
      <a class="btn" target="_blank" href="${job.hostedUrl}">Find out more</a>
    </div>
    <div class="job-background"></div>
  </div>`
}
