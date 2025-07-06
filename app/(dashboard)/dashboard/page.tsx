// C:\Users\mgimw\sustainly-task\app\(dashboard)\page.tsx

'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { removeTeamMember, inviteTeamMember } from '@/app/(login)/actions'; // Corrected path to actions
import useSWR from 'swr';
import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

type ActionState = {
  error?: string;
  success?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SubscriptionSkeleton() {
  return (
    <Card className="mb-8 h-[140px] bg-card text-card-foreground border border-border shadow-sm"> {/* Sustainly card styling */}
      <CardHeader>
        <CardTitle className="font-heading text-primary-dark-blue">Team Subscription</CardTitle> {/* Sustainly heading */}
      </CardHeader>
    </Card>
  );
}

function ManageSubscription() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);

  return (
    <Card className="mb-8 bg-card text-card-foreground border border-border shadow-sm"> {/* Sustainly card styling */}
      <CardHeader>
        <CardTitle className="font-heading text-primary-dark-blue">Team Subscription</CardTitle> {/* Sustainly heading */}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <p className="font-body font-medium text-foreground"> {/* Sustainly font and text color */}
                Current Plan: <span className="text-accent-green">{teamData?.planName || 'Free'}</span> {/* Highlight plan name with accent green */}
              </p>
              <p className="text-sm font-body text-muted-foreground"> {/* Sustainly font and muted text color */}
                {teamData?.subscriptionStatus === 'active'
                  ? 'Billed monthly'
                  : teamData?.subscriptionStatus === 'trialing'
                  ? 'Trial period'
                  : 'No active subscription'}
              </p>
            </div>
            <form action={customerPortalAction}>
              <Button
                type="submit"
                variant="outline"
                className="bg-primary-white text-primary-dark-blue border-primary-dark-blue hover:bg-primary-dark-blue hover:text-primary-white rounded-full shadow-sm font-semibold" // Sustainly outline button
              >
                Manage Subscription
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamMembersSkeleton() {
  return (
    <Card className="mb-8 h-[140px] bg-card text-card-foreground border border-border shadow-sm"> {/* Sustainly card styling */}
      <CardHeader>
        <CardTitle className="font-heading text-primary-dark-blue">Team Members</CardTitle> {/* Sustainly heading */}
      </CardHeader>
      <CardContent>
        <div className="animate-pulse space-y-4 mt-1">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-muted"></div> {/* Use muted for skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded"></div> {/* Use muted for skeleton */}
              <div className="h-3 w-14 bg-muted rounded"></div> {/* Use muted for skeleton */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamMembers() {
  const { data: teamData } = useSWR<TeamDataWithMembers>('/api/team', fetcher);
  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, {});

  const getUserDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) => {
    return user.name || user.email || 'Unknown User';
  };

  if (!teamData?.teamMembers?.length) {
    return (
      <Card className="mb-8 bg-card text-card-foreground border border-border shadow-sm"> {/* Sustainly card styling */}
        <CardHeader>
          <CardTitle className="font-heading text-primary-dark-blue">Team Members</CardTitle> {/* Sustainly heading */}
        </CardHeader>
        <CardContent>
          <p className="font-body text-muted-foreground">No team members yet.</p> {/* Sustainly font and muted text */}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 bg-card text-card-foreground border border-border shadow-sm"> {/* Sustainly card styling */}
      <CardHeader>
        <CardTitle className="font-heading text-primary-dark-blue">Team Members</CardTitle> {/* Sustainly heading */}
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {teamData.teamMembers.map((member, index) => (
            <li key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  {/* Optional: Show user image if available */}
                  {/* <AvatarImage src={member.user.image || ''} alt={getUserDisplayName(member.user)} /> */}
                  <AvatarFallback className="bg-muted text-muted-foreground font-body"> {/* Sustainly avatar fallback */}
                    {getUserDisplayName(member.user)
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-body font-medium text-foreground"> {/* Sustainly font and text color */}
                    {getUserDisplayName(member.user)}
                  </p>
                  <p className="text-sm font-body text-muted-foreground capitalize"> {/* Sustainly font and muted text */}
                    {member.role}
                  </p>
                </div>
              </div>
              {index > 1 ? ( // Only allow removing members beyond the first two (e.g., owner and initial member)
                <form action={removeAction}>
                  <input type="hidden" name="memberId" value={member.id} />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="bg-primary-white text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground rounded-full shadow-sm font-semibold" // Destructive button for remove
                    disabled={isRemovePending}
                  >
                    {isRemovePending ? 'Removing...' : 'Remove'}
                  </Button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
        {removeState?.error && (
          <p className="text-destructive font-body mt-4">{removeState.error}</p> 
        )}
      </CardContent>
    </Card>
  );
}

function InviteTeamMemberSkeleton() {
  return (
    <Card className="h-[260px] bg-card text-card-foreground border border-border shadow-sm"> {/* Sustainly card styling */}
      <CardHeader>
        <CardTitle className="font-heading text-primary-dark-blue">Invite Team Member</CardTitle> {/* Sustainly heading */}
      </CardHeader>
    </Card>
  );
}

function InviteTeamMember() {
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const isOwner = user?.role === 'owner';
  const [inviteState, inviteAction, isInvitePending] = useActionState<
    ActionState,
    FormData
  >(inviteTeamMember, {});

  return (
    <Card className="bg-card text-card-foreground border border-border shadow-sm"> {/* Sustainly card styling */}
      <CardHeader>
        <CardTitle className="font-heading text-primary-dark-blue">Invite Team Member</CardTitle> {/* Sustainly heading */}
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2 font-body text-foreground"> {/* Sustainly font and text color */}
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
              disabled={!isOwner}
              className="rounded-md border border-input bg-input placeholder-muted-foreground text-foreground focus:outline-none focus:ring-ring focus:border-ring sm:text-sm" // Sustainly input styling
            />
          </div>
          <div>
            <Label className="font-body text-foreground">Role</Label> {/* Sustainly font and text color */}
            <RadioGroup
              defaultValue="member"
              name="role"
              className="flex space-x-4"
              disabled={!isOwner}
            >
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="member" id="member" className="border-input text-primary focus:ring-ring" /> {/* Sustainly radio styling */}
                <Label htmlFor="member" className="font-body text-foreground">Member</Label> {/* Sustainly font and text color */}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="owner" id="owner" className="border-input text-primary focus:ring-ring" /> {/* Sustainly radio styling */}
                <Label htmlFor="owner" className="font-body text-foreground">Owner</Label> {/* Sustainly font and text color */}
              </div>
            </RadioGroup>
          </div>
          {inviteState?.error && (
            <p className="text-destructive font-body">{inviteState.error}</p> 
          )}
          {inviteState?.success && (
            <p className="text-accent-green font-body">{inviteState.success}</p> 
          )}
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-sm font-semibold" // Sustainly primary button
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inviting...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite Member
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardFooter className="bg-card border-t border-border"> {/* Sustainly card footer styling */}
          <p className="text-sm font-body text-muted-foreground"> {/* Sustainly font and muted text */}
            You must be a team owner to invite new members.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <section className="flex-1 p-4 lg:p-8 bg-background text-foreground"> {/* Apply theme colors to section */}
      <h1 className="text-lg lg:text-2xl font-heading font-bold mb-6 text-primary-dark-blue">Team Settings</h1> {/* Sustainly heading */}

      {/* Theme switcher at the top */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <Label htmlFor="theme-select" className="mb-2 sm:mb-0 font-body font-semibold text-muted-foreground"></Label> {/* Sustainly font and muted text */}
        <ThemeSwitcher /> {/* ThemeSwitcher component will need its own styling review */}
      </div>


      <Suspense fallback={<SubscriptionSkeleton />}>
        <ManageSubscription />
      </Suspense>
      <Suspense fallback={<TeamMembersSkeleton />}>
        <TeamMembers />
      </Suspense>
      <Suspense fallback={<InviteTeamMemberSkeleton />}>
        <InviteTeamMember />
      </Suspense>
    </section>
  );
}
