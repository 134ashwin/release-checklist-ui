import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Release, CreateReleaseInput, UpdateReleaseStepsInput } from './release.model';

const GET_RELEASES = gql`
  query GetReleases {
    releases {
      id
      name
      releaseDate
      additionalInfo
      completedStepIds
      status
      createdAt
      updatedAt
    }
  }
`;

const CREATE_RELEASE = gql`
  mutation CreateRelease($input: CreateReleaseInput!) {
    createRelease(input: $input) {
      id
      name
      releaseDate
      status
    }
  }
`;

const UPDATE_RELEASE_STEPS = gql`
  mutation UpdateReleaseSteps($input: UpdateReleaseStepsInput!) {
    updateReleaseSteps(input: $input) {
      id
      completedStepIds
      status
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class ReleaseService {
  constructor(private apollo: Apollo) {}

  getReleases(): Observable<Release[]> {
    return this.apollo
      .watchQuery<{ releases: Release[] }>({ query: GET_RELEASES })
      .valueChanges.pipe(
        map((res) => (res.data?.releases ? (res.data.releases as Release[]) : []))
      );
  }

  createRelease(input: CreateReleaseInput): Observable<Release> {
    return this.apollo
      .mutate<{ createRelease: Release }>({
        mutation: CREATE_RELEASE,
        variables: { input },
        refetchQueries: [{ query: GET_RELEASES }],
      })
      .pipe(
        map((res) => res.data!.createRelease as Release)
      );
  }

  updateReleaseSteps(input: UpdateReleaseStepsInput): Observable<Release> {
    return this.apollo
      .mutate<{ updateReleaseSteps: Release }>({
        mutation: UPDATE_RELEASE_STEPS,
        variables: { input },
        refetchQueries: [{ query: GET_RELEASES }],
      })
      .pipe(
        map((res) => res.data!.updateReleaseSteps as Release)
      );
  }
}