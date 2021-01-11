import React, { Component } from "react";

import { getRepositories } from "../../services/repoService";
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
      const newData = repos.items;
      this.setState({ repos: newData });
    } else {
      this.setState({ bookmarks: reposFromStorage });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.repos !== this.state.repos) {
      const updatedRepos = this.state.repos.map((repo) => {
        return {
          id: repo.id,
          owner: repo.owner,
          url: repo.url,
          title: repo.name,
          description: repo.description,
          isBookmarked: false,
          numOfStars: repo.stargazers_count,
        };
      });
      this.setState({ bookmarks: updatedRepos });
      localStorage.setItem("repos", JSON.stringify(updatedRepos));
    }
  }

  bookmark = (repo) => {
    const newRepos = [...this.state.bookmarks];
    const index = newRepos.indexOf(repo);
    newRepos[index].isBookmarked = !newRepos[index].isBookmarked;
    this.setState({ bookmarks: newRepos });
    localStorage.setItem("repos", JSON.stringify(this.state.bookmarks));
  };

  saveRepo = (repo) => {
    localStorage.setItem("repo", JSON.stringify(repo));
  };

  render() {
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
            clicked={() => this.saveRepo(repo)}
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
