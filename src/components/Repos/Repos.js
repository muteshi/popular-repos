import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";

import {
  getRepositories,
  getRepositoryStars,
} from "../../services/repoService";
import RepoCard from "./Repo/Repo";

class Repositories extends Component {
  state = {
    repos: [],
    transformedRepos: [],
    bookmarks: [],
  };

  async componentDidMount() {
    const reposFromStorage = JSON.parse(localStorage.getItem("repos") || "[]");
    if (reposFromStorage.length === 0) {
      const { data: repos } = await getRepositories();
      this.setState({ repos });
    } else {
      this.setState({ bookmarks: reposFromStorage });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.repos !== this.state.repos) {
      const updatedRepos = this.state.repos.map(async (repo) => {
        const { data: stars } = await getRepositoryStars(repo.stargazers_url);
        const numOfStars = stars.length;
        return {
          id: repo.id,
          owner: repo.owner,
          title: repo.name,
          description: repo.description,
          isBookmarked: false,
          url: repo.url,
          numOfStars,
        };
      });
      this.setState({ bookmarks: await Promise.all(updatedRepos) });
      localStorage.setItem(
        "repos",
        JSON.stringify(await Promise.all(updatedRepos))
      );
    }
  }

  bookmark = (repo) => {
    const newRepos = [...this.state.bookmarks];
    const index = newRepos.indexOf(repo);
    newRepos[index].isBookmarked = !newRepos[index].isBookmarked;
    this.setState({ bookmarks: newRepos });
    localStorage.setItem("repos", JSON.stringify(this.state.bookmarks));
  };

  render() {
    console.log(this.props);
    const repos = this.state.bookmarks
      .sort((a, b) => b.numOfStars - a.numOfStars)
      .slice(0, 10)
      .map((repo) => {
        return (
          <RepoCard
            bookmark={() => this.bookmark(repo)}
            key={repo.id}
            owner={repo.owner.login}
            title={repo.title}
            repoId={repo.id}
            repoUrl={repo.url}
            description={repo.description}
            numOfStars={repo.numOfStars}
            isBookmarked={repo.isBookmarked}
          />
        );
      });

    return <div>{repos}</div>;
  }
}

export default Repositories;
